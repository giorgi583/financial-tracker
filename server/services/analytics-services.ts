const Transaction = require('../modules/transaction-schema');
const UserPrefference = require('../modules/userPrefferences-schema');
const {Op} = require('sequelize');
const {Sequelize} = require('sequelize');

export const spendingByCategory = async (req: any, res: any) => {
    const userId = req.user.id;
    const { from, to } = req.query;
    const where: any = { userId };
where.date = { [Op.between]: [new Date(from as string), new Date(to as string)] };
try {
    const transactions = await Transaction.findAll({ where: { ...where, type: 'expense' },  attributes: ['category', [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount']], group: ['category'], order: [[Sequelize.literal('amount'), 'DESC']], raw: true });
    if(transactions.length === 0) return res.status(404).json({ success: false, error: 'Transactions not found' });
    return res.status(200).json({ success: true, data: transactions });
    
}
catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
}
}
export const incomeByCategory = async (req: any, res: any) => {
    const userId = req.user.id;
    const { from, to } = req.query;
    const where: any = { userId };

   where.date = { [Op.between]: [new Date(from as string), new Date(to as string)] };
try {
    const transactions = await Transaction.findAll({ where: { ...where, type: 'income' },  attributes: ['category', [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount']], group: ['category'], order: [[Sequelize.literal('amount'), 'DESC']], raw: true });
    if(transactions.length === 0) return res.status(404).json({ success: false, error: 'Transactions not found' });
    return res.status(200).json({ success: true, data: transactions });
    
}
catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
}
}

export const Trend = async (req: any, res: any) => {
    const userId = req.user.id;
    const { from, to } = req.query;
    const where: any = { userId };

   where.date = { [Op.between]: [new Date(from as string), new Date(to as string)] };
    const daysDiff = Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60 * 24));
    const granularity = daysDiff === 0 ? 'hour' : daysDiff <= 31 ? 'day' : daysDiff <= 90 ? 'week' : 'month';
try {
    const trend = await Transaction.findAll({ where, attributes: [[Sequelize.fn('DATE_TRUNC', granularity, Sequelize.col('date')), 'period'], 'type',
    [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount']], group: ['period', 'type'], order: [[Sequelize.literal('period'), 'ASC']], raw: true });
    if(trend.length === 0) return res.status(404).json({ success: false, error: 'Transactions not found' });
    return res.status(200).json({ success: true, data: trend });
}
catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
}
}

export const trendByCategory = async (req: any, res: any) => {
    const userId = req.user.id;
    const { from, to, category } = req.query;
    const where: any = { userId };
    where.date = { [Op.between]: [new Date(from as string), new Date(to as string)] };
    const daysDiff = Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60 * 24));
    const granularity = daysDiff === 0 ? 'hour' : daysDiff <= 31 ? 'day' : daysDiff <= 90 ? 'week' : 'month';
try {
    const trend = await Transaction.findAll({
            where,
            attributes: [
                [Sequelize.fn('DATE_TRUNC', granularity, Sequelize.col('date')), 'period'],
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount']
            ],
            group: ['period'],
            order: [[Sequelize.literal('period'), 'ASC']],
            raw: true
        });
    if(trend.length === 0) return res.status(404).json({ success: false, error: 'Transactions not found' });
    return res.status(200).json({ success: true, data: trend });
}
catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
}
}

export const topSpendingDays = async (req: any, res: any) => {
    const userId = req.user.id;
    const { from, to } = req.query;
    const where: any = { userId };
    where.date = { [Op.between]: [new Date(from as string), new Date(to as string)] };
    try {
    const transactions = await Transaction.findAll({ where: { ...where, type: 'expense' }, attributes: ['date', [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount']], group: ['date'], order: [[Sequelize.literal('amount'), 'DESC']], limit: 5, raw: true });
    if(transactions.length === 0) return res.status(404).json({ success: false, error: 'Transactions not found' });
    return res.status(200).json({ success: true, data: transactions });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}