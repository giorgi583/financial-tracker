import { Op } from "sequelize";
const { Sequelize } = require('sequelize');
const UserPrefference = require('../modules/userPrefferences-schema');
const Transaction = require('../modules/transaction-schema');

export const getDashboardData = async (req: any, res: any) => {
    const { from, to } = req.query; 
    console.log('Query params:', req.query)
    const userId = req.user.id;
    const where : any = { userId };
    if(from !=='null' && to !== 'null') where.date = { [Op.between]: [new Date(from), new Date(to)] };
    try {
        const AllTransactions = await Transaction.findAll({where: {userId}});
        const user = await UserPrefference.findOne({
            where: { userId }
        })
        const initialBalance = user?.initialBalance || 0;
 
        const totalIncome = AllTransactions.reduce((sum: number, t: any) => sum + (t.type === 'income' ? t.amount : 0), 0);
        const totalExpense = AllTransactions.reduce((sum: number, t: any) => sum + (t.type === 'expense' ? t.amount : 0), 0);
        const balance = initialBalance + totalIncome - totalExpense;
        // dgeebi tarigebs shoris
        const daysDiff = Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60 * 24));
        // ra aigos nishnulad dge, kvira, tu tve
        const granularity = daysDiff <= 31 ? 'day' : daysDiff <= 90 ? 'week' : 'month';
        const [income, expense, spendingByCategory, recentTransactions, trend] = await Promise.all([
            Transaction.sum('amount', { where: {...where, type: 'income'}}),
            Transaction.sum('amount', { where: {...where, type: 'expense'}}),
            Transaction.findAll({ where: { ...where, type: 'expense' },  attributes: ['category', [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount']], group: ['category'], order: [[Sequelize.literal('amount'), 'DESC']], raw: true }),
            Transaction.findAll({ where: { userId }, order: [['date', 'DESC']], limit: 5, raw: true }),
            Transaction.findAll({ where,
    attributes: [
        [Sequelize.fn('DATE_TRUNC', granularity, Sequelize.col('date')), 'period'],
        'type',
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount']
    ],
    group: ['period', 'type'],
    order: [[Sequelize.literal('period'), 'ASC']],
    raw: true
})
        ])
        const total = spendingByCategory.reduce((sum: number, c: any) => sum + Number(c.amount), 0);

const byCategoryWithPercentage = spendingByCategory.map((c: any) => ({
    category: c.category,
    amount: Number(c.amount),
    percentage: Math.round((Number(c.amount) / total) * 100)
}));

const topCategories = byCategoryWithPercentage.slice(0, 3);
           
        return res.status(200).json({ success: true, data: { income, expense, balance, spendingByCategory, recentTransactions, trend, topCategories } });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
    }
};