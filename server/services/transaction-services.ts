import { Op } from "sequelize";

const {z} = require('zod');
const Transaction = require('../modules/transaction-schema');

const transactionSchema = z.object({
    userId: z.number(),
    type: z.enum(['income', 'expense']),
    description: z.string().max(70).optional(),
    amount: z.number(),
    category: z.string(),
    date: z.string().refine((value: string) => { return new Date(value) <= new Date()}, {
        message: 'Date cannot be in the future',
    }),
});
async function addTransaction(req : any, res: any) {
    console.log('Received transaction:', req.body);
    const newTransaction = req.body;
    const userId = req.user.id;
    newTransaction.userId = userId;
const validation = transactionSchema.safeParse(newTransaction);
if (!validation.success) {
    return res.status(400).json({ success: false, message: validation.error.errors });
}
try {
    const createdTransaction = await Transaction.create(newTransaction);
    if(!createdTransaction) {
        return res.status(500).json({ success: false, message: 'Failed to add transaction' });
    }
    return res.status(200).json({ success: true, message: 'Transaction added successfully', data: createdTransaction });
} catch (error) {
    console.error('Error adding transaction:', error);
    return res.status(500).json({ success: false, message: 'Failed to add transaction' });
}
}
async function getTransactions(req: any, res: any) {
    const {description, maxAmount, minAmount, type, category, from, to, orderBy} = req.query;
    console.log('Query params:', req.query)
    const userId = req.user.id;
    try {
         const where: any = {userId};
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

async function deleteTransaction(req: any, res: any) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const deleted = await Transaction.destroy({ where: { id, userId } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Transaction deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return res.status(500).json({ success: false, message: 'Failed to delete transaction' });
    }
}

async function editTransaction(req: any, res: any) {
    const { id } = req.params;
    const updatedData = req.body;
    const validation = transactionSchema.partial().safeParse(updatedData);
if (!validation.success) {
  
    return res.status(400).json({ success: false, message: validation.error.errors });
}
    try {
        const userId = req.user.id;
        const updated = await Transaction.update(updatedData, { where: { id, userId } });
        if (updated) {
            return res.status(200).json({ success: true, message: 'Transaction updated successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
        return res.status(500).json({ success: false, message: 'Failed to update transaction' });
    }
}
module.exports = {
    addTransaction,
    getTransactions,
    deleteTransaction,
    editTransaction
}