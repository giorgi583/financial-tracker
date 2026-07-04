const {z} = require('zod');
const { Op } = require('sequelize');
const Goal = require('../modules/goals-schema');
const Transaction = require('../modules/transaction-schema');
const UserPrefference = require('../modules/userPrefferences-schema');
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