const Budget = require('../modules/budget-schema');
const {z} = require('zod');
const {Op} = require('sequelize');
const Transaction = require('../modules/transaction-schema');
const UserPrefference = require('../modules/userPrefferences-schema');

const budgetSchema = z.object({
    amount: z.number().positive('Amount must be a positive number'),
    category: z.enum(['Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Education', 'Shopping', 'Travel', 'Clothing']),
});


export const getBudgets = async (req: any, res: any) => {
const userId = req.user.id;
const now = new Date();
const from = new Date(now.getFullYear(), now.getMonth(), 1);
const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);

try {
    const budgets = await Budget.findAll({
        where: {
            userId,
        },
        raw: true,
    });
    const budgetsWithSpending = await Promise.all(budgets.map(async (budget: any) => {
        const spent = await Transaction.sum('amount', {
            where: {
                userId,
                category: budget.category,
                type: 'expense',
                date: { [Op.between]: [from, to] },
            },
        }) || 0;
        return { ...budget, spent, remaining: budget.amount - spent, alarming: spent > budget.amount, percentage: budget.amount > 0 ? Math.round((spent / budget.amount) * 100) : 0 };
    }));
    const userPreferences = await UserPrefference.findOne({ where: { userId } });
    if (!userPreferences) {
        return res.status(404).json({ success: false, error: 'User preferences not found' });
    }
    const currency = userPreferences.currency;
    return res.json({ success: true, data: budgetsWithSpending, currency });
} catch (error) {
    console.error('Error fetching budgets:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch budgets' });
}

}

export const createBudget = async (req: any, res: any) => {
    const userId = req.user.id;
    const { amount, category } = req.body;
   console.log('Received budget data:', { amount, category });
    const validation = budgetSchema.safeParse({ amount, category });
    if (!validation.success) {
        return res.status(400).json({ success: false, error: validation.error.errors });
    }
    try {
        const budget = await Budget.create({ userId, amount, category });
        return res.status(201).json({ success: true, data: budget });
    } catch (error) {
        console.error('Error creating budget:', error);
        return res.status(500).json({ success: false, error: 'Failed to create budget' });
    }
};

export const updateBudget = async (req: any, res: any) => {
    const userId = req.user.id;
    const { amount, category } = req.body;

    const validation = budgetSchema.safeParse({ amount, category });
    if (!validation.success) {
        return res.status(400).json({ success: false, error: validation.error.errors });
    }
    try {
        const [updated] = await Budget.update({ amount, category }, { where: { category, userId } });
        if (updated) {
            return res.status(200).json({ success: true, message: 'Budget updated successfully' });
        } else {
            return res.status(404).json({ success: false, error: 'Budget not found' });
        }
    } catch (error) {
        console.error('Error updating budget:', error);
        return res.status(500).json({ success: false, error: 'Failed to update budget' });
    }
};

export const deleteBudget = async (req: any, res: any) => {
    const userId = req.user.id;
    const { id } = req.params;
    try {
        const deleted = await Budget.destroy({ where: { id, userId } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Budget deleted successfully' });
        } else {
            return res.status(404).json({ success: false, error: 'Budget not found' });
        }
    } catch (error) {
        console.error('Error deleting budget:', error);
        return res.status(500).json({ success: false, error: 'Failed to delete budget' });
    }
};