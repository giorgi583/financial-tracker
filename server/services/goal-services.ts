const {z} = require('zod');
const { Op } = require('sequelize');
const Goal = require('../modules/goals-schema');
const Transaction = require('../modules/transaction-schema');
const UserPrefference = require('../modules/userPrefferences-schema');
const Budget = require('../modules/budget-schema');
const User = require('../modules/users-schema');
const goalSchema = z.object({
    type: z.enum(['Long_term_savings', 'monthly_savings', 'Cut_down_spending', 'Increase_monthly_income']),
    title: z.string(),
    targetAmount: z.number(),
    deadline: z.coerce.date().min(new Date()).optional(),
    category: z.string().optional()
});


export const createGoal = async (req: any, res: any) => {
    const userId = req.user.id;
    console.log(req.body);
    const parsedData = goalSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(400).json({success: false, message: 'Invalid data'});
    }
      if (parsedData.data.type === 'Cut_down_spending' && !parsedData.data.category) {
        return res.status(400).json({ success: false, message: 'Category is required for spending cut goals' });
    }
    if (parsedData.data.type === 'Cut_down_spending' ) {
     const existingGoal = await Goal.findOne({ where: { userId, type: 'Cut_down_spending', category: parsedData.data.category } });
        if (existingGoal) {
            console.log('A spending cut goal for this category already exists');
            return res.status(400).json({ success: false, message: 'A spending cut goal for this category already exists' });
        }
    }
    else {
        const existingGoal = await Goal.findOne({ where: { userId, type: parsedData.data.type } });
        if (existingGoal) {
            return res.status(400).json({ success: false, message: 'A goal of this type already exists' });
        }
    }
    try {
       
        const newGoal = await Goal.create({
            userId,
            ...parsedData.data
        });
        res.status(201).json({success: true, message: 'Goal created successfully', data: newGoal});
    }
    catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const getGoals = async (req: any, res: any) => {
    const userId = req.user.id;
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const isEndOfMonth = now.getDate() === to.getDate();
    try {
        const goals = await Goal.findAll({ where: { userId }, raw: true });

        // fetch these once and reuse across all goals
        const [totalIncome, totalExpenses, monthlyIncome, monthlyExpenses, userPref] = await Promise.all([
            Transaction.sum('amount', { where: { userId, type: 'income' } }) || 0,
            Transaction.sum('amount', { where: { userId, type: 'expense' } }) || 0,
            Transaction.sum('amount', { where: { userId, type: 'income', date: { [Op.between]: [from, to] } } }) || 0,
            Transaction.sum('amount', { where: { userId, type: 'expense', date: { [Op.between]: [from, to] } } }) || 0,
            UserPrefference.findOne({ where: { userId }, raw: true })
        ]);

        const initialBalance = (userPref as any)?.initialBalance || 0;
        const currentBalance = initialBalance + (totalIncome || 0) - (totalExpenses || 0);
        const monthlySavings = (monthlyIncome || 0) - (monthlyExpenses || 0);

        const goalsWithProgress = await Promise.all(
            goals.map(async (goal: any) => {
                let currentAmount = 0;
                let status = goal.status;

                switch (goal.type) {
                    case 'Long_term_savings':
                        currentAmount = currentBalance;
                        status = now <= goal.deadline && currentAmount >= goal.targetAmount ? 'completed' : now <= goal.deadline ? 'active' : 'failed';
                        break;

                    case 'monthly_savings':
                        currentAmount = monthlySavings;
                        status = isEndOfMonth && currentAmount >= goal.targetAmount ? 'completed' : 'active';
                        break;

                    case 'Cut_down_spending':
                        currentAmount = await Transaction.sum('amount', {
                            where: {
                                userId,
                                type: 'expense',
                                category: goal.category,
                                date: { [Op.between]: [from, to] }
                            }
                        }) || 0;
                        // reversed — lower spending is better
                        status = currentAmount >= goal.targetAmount ? 'failed' : 'active';
                        break;

                    case 'Increase_monthly_income':
                        currentAmount = monthlyIncome || 0;
                        status = currentAmount >= goal.targetAmount ? 'completed' : 'active';
                        break;
                }

                const percentage = goal.type === 'Cut_down_spending'
                    ? Math.round((1 - currentAmount / goal.targetAmount) * 100)  // inverted for spending
                    : Math.round((currentAmount / goal.targetAmount) * 100);

                return {
                    ...goal,
                    currentAmount,
                    status,
                    percentage: Math.min(Math.max(percentage, 0), 100)  // cap at 100%
                };
            })
        );

        // update statuses in DB if they changed
        await Promise.all(
            goalsWithProgress.map((goal: any) => {
                if (goal.status !== goals.find((g: any) => g.id === goal.id)?.status) {
                    return Goal.update({ status: goal.status }, { where: { id: goal.id } });
                }
            })
        );

        return res.status(200).json({ success: true, data: goalsWithProgress });
    } catch (error) {
        console.error('Error fetching goals:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateGoals = async (req: any, res: any) => {
    console.log(req.body)
    const userId = req.user.id;
    const { id } = req.params;
    const validated = goalSchema.partial().safeParse(req.body);
    if (!validated.success) {
        console.log(validated.error);
        return res.status(400).json({ success: false, message: validated.error.errors });
    }
    const updatedData = req.body;
    try {
        const [updated] = await Goal.update(updatedData, { where: { id, userId } });
        if (updated) {
            return res.status(200).json({ success: true, message: 'Goal updated successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Goal not found' });
        }
    } catch (error) {
        console.error('Error updating goal:', error);
        return res.status(500).json({ success: false, message: 'Failed to update goal' });
    }
}

export const deleteGoals = async (req: any, res: any) => {
    const userId = req.user.id;
    const {id} = req.params;
    try {
        const deleted = await Goal.destroy({ where: { id, userId } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Goal deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Goal not found' });
        }
    } catch (error) {
        console.error('Error deleting goal:', error);
        return res.status(500).json({ success: false, message: 'Failed to delete goal' });
    }
}
export const getAlerts = async (req: any, res: any) => {
    const userId = req.user.id;
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const alerts: any[] = [];

    try {
        // ── shared data ──────────────────────────────────────
        const [budgets, goals, userPref, totalIncome, totalExpenses] = await Promise.all([
            Budget.findAll({ where: { userId }, raw: true }),
            Goal.findAll({ where: { userId }, raw: true }),
            UserPrefference.findOne({ where: { userId }, raw: true }),
            Transaction.sum('amount', { where: { userId, type: 'income' } }),
            Transaction.sum('amount', { where: { userId, type: 'expense' } }),
        ]);

        const initialBalance = (userPref as any)?.initialBalance || 0;
        const currentBalance = initialBalance + (totalIncome || 0) - (totalExpenses || 0);

        // ── budget alerts ─────────────────────────────────────
        await Promise.all(
            budgets.map(async (budget: any) => {
                const spent = await Transaction.sum('amount', {
                    where: {
                        userId,
                        type: 'expense',
                        category: budget.category,
                        date: { [Op.between]: [from, to] }
                    }
                }) || 0;

                const percentage = Math.round((spent / budget.amount) * 100);

                if (percentage >= 100) {
                    alerts.push({
                        type: 'budget_exceeded',
                        severity: 'danger',
                        title: `${budget.category} budget exceeded`,
                        message: `You've spent ${spent} of your ${budget.amount} ${(userPref as any)?.currency} ${budget.category} budget`,
                        category: budget.category
                    });
                } else if (percentage >= 80) {
                    alerts.push({
                        type: 'budget_warning',
                        severity: 'warning',
                        title: `${budget.category} budget almost full`,
                        message: `You've used ${percentage}% of your ${budget.category} budget (${spent}/${budget.amount} ${(userPref as any)?.currency})`,
                        category: budget.category
                    });
                }
            })
        );

        // ── goal alerts ───────────────────────────────────────
        goals.forEach((goal: any) => {
            // completed
            if (goal.status === 'completed') {
                alerts.push({
                    type: 'goal_completed',
                    severity: 'info',
                    title: `Goal completed`,
                    message: `You've completed your "${goal.title}" goal`,
                });
            }

            // deadline based alerts
            if (goal.deadline && goal.status === 'active') {
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                if (daysLeft < 0) {
                    alerts.push({
                        type: 'goal_failed',
                        severity: 'danger',
                        title: `Goal deadline passed`,
                        message: `Your "${goal.title}" goal deadline has passed without completion`,
                    });
                } else if (daysLeft <= 7) {
                    alerts.push({
                        type: 'goal_deadline_approaching',
                        severity: 'warning',
                        title: `Goal deadline approaching`,
                        message: `Your "${goal.title}" goal is due in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
                    });
                }
            }
        });

        // ── spending alerts ───────────────────────────────────
        const currency = (userPref as any)?.currency || 'USD';

        // large single transactions
        const largeTransactions = await Transaction.findAll({
            where: {
                userId,
                type: 'expense',
                amount: { [Op.gte]: 1000 },
                date: { [Op.between]: [from, to] }
            },
            raw: true
        });

        largeTransactions.forEach((t: any) => {
            alerts.push({
                type: 'large_transaction',
                severity: 'warning',
                title: 'Large expense detected',
                message: `${t.description} — ${t.amount} ${currency} on ${new Date(t.date).toLocaleDateString()}`,
                category: t.category
            });
        });

        // this month vs last month spending
        const lastMonthFrom = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthTo = new Date(now.getFullYear(), now.getMonth(), 0);

        const [thisMonthExpenses, lastMonthExpenses] = await Promise.all([
            Transaction.sum('amount', { where: { userId, type: 'expense', date: { [Op.between]: [from, to] } } }) || 0,
            Transaction.sum('amount', { where: { userId, type: 'expense', date: { [Op.between]: [lastMonthFrom, lastMonthTo] } } }) || 0,
        ]);

        if (lastMonthExpenses > 0) {
            const increasePercent = Math.round(((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100);
            if (increasePercent >= 20) {
                alerts.push({
                    type: 'spending_increase',
                    severity: 'warning',
                    title: 'Spending increased significantly',
                    message: `You're spending ${increasePercent}% more than last month (${thisMonthExpenses} vs ${lastMonthExpenses} ${currency})`,
                });
            }
        }

        // no income this month
        const thisMonthIncome = await Transaction.sum('amount', {
            where: { userId, type: 'income', date: { [Op.between]: [from, to] } }
        });

        if (!thisMonthIncome) {
            alerts.push({
                type: 'no_income',
                severity: 'warning',
                title: 'No income recorded this month',
                message: `You haven't recorded any income for ${now.toLocaleString('default', { month: 'long' })}`,
            });
        }

        // negative balance
        if (currentBalance < 0) {
            alerts.push({
                type: 'negative_balance',
                severity: 'danger',
                title: 'Negative balance',
                message: `Your current balance is ${currentBalance} ${currency}`,
            });
        }

        return res.status(200).json({ success: true, data: alerts });

    } catch (error) {
        console.error('Error fetching alerts:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};