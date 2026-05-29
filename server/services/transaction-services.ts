import { Op } from "sequelize";

const {z} = require('zod');
const Transaction = require('../modules/transaction-schema');
async function addTransaction(req : any, res: any) {
    console.log('Received transaction:', req.body);
    const newTransaction = req.body;
const transactionSchema = z.object({
    type: z.enum(['income', 'expense']),
    description: z.string().max(50).optional(),
    amount: z.number(),
    category: z.string(),
    date: z.string().refine((value: string) => { return new Date(value) <= new Date()}, {
        message: 'Date cannot be in the future',
    }),
});
const validation = transactionSchema.safeParse(newTransaction);
if (!validation.success) {
    const error = JSON.parse(JSON.parse(validation.error.message));
    return res.status(400).json({ success: false, message: error });
}
const createdTransaction = await Transaction.create(newTransaction);
if(!createdTransaction) {
    return res.status(500).json({ success: false, message: 'Failed to add transaction' });
}
return res.status(200).json({ success: true, message: 'Transaction added successfully', data: createdTransaction });
}

async function getTransactions(req: any, res: any) {
    const {description, maxAmount, minAmount, type, category, from, to, orderBy} = req.query;
    console.log('Query params:', req.query)
    try {
         const where: any = {};
  if (description) where.description = { [Op.like]: `%${description}%` };
  if (type)        where.type = type;
  if (category)    where.category = category;

  if (minAmount && maxAmount) {
    where.amount = { [Op.between]: [Number(minAmount), Number(maxAmount)] };
  } else if (minAmount) {
    where.amount = { [Op.gte]: Number(minAmount) };
  } else if (maxAmount) {
    where.amount = { [Op.lte]: Number(maxAmount) };
  }

  if (from && to) {
    where.date = { [Op.between]: [new Date(String(from)), new Date(String(to))] };
  } else if (from) {
    where.date = { [Op.gte]: new Date(String(from)) };
  } else if (to) {
    where.date = { [Op.lte]: new Date(String(to)) };
  }
  console.log('Where clause:', JSON.stringify(where, null, 2))
        const transactions = await Transaction.findAll({ where, order: [['date', orderBy === 'asc' ? 'ASC' : 'DESC']] });
        console.log('Sample transaction:', JSON.stringify(transactions[0], null, 2))
        return res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
    }
}

module.exports = {
    addTransaction,
    getTransactions
}