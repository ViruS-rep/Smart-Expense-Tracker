const express = require('express');
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// @route   GET /api/transactions
// @desc    Get all transactions for logged in user (optional filters: month, year, category, type)
router.get('/', async (req, res) => {
  try {
    const { month, year, category, type } = req.query;
    const filter = { user: req.user._id };

    if (month && year) {
      const start = new Date(Number(year), Number(month) - 1, 1);
      const end = new Date(Number(year), Number(month), 1);
      filter.date = { $gte: start, $lt: end };
    }
    if (category) filter.category = category;
    if (type) filter.type = type;

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/transactions/categories
// @desc    Get list of allowed categories
router.get('/categories', (req, res) => {
  res.json(Transaction.CATEGORIES);
});

// @route   GET /api/transactions/analytics/summary
// @desc    Get yearly summary: totals + category breakdown + monthly breakdown
router.get('/analytics/summary', async (req, res) => {
  try {
    const { year } = req.query;
    const targetYear = year ? Number(year) : new Date().getFullYear();
    const start = new Date(targetYear, 0, 1);
    const end = new Date(targetYear + 1, 0, 1);

    const transactions = await Transaction.find({
      user: req.user._id,
      date: { $gte: start, $lt: end },
    });

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryBreakdown = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + t.amount;
      });

    const monthlyBreakdown = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
    }));
    transactions.forEach((t) => {
      const m = new Date(t.date).getMonth();
      if (t.type === 'income') monthlyBreakdown[m].income += t.amount;
      else monthlyBreakdown[m].expense += t.amount;
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryBreakdown: Object.entries(categoryBreakdown).map(([name, value]) => ({
        name,
        value,
      })),
      monthlyBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/transactions/:id
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const { type, amount, category, description, paymentMethod, date } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Please provide a valid amount' });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      description,
      paymentMethod,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/transactions/:id
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    Object.assign(transaction, req.body);
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    await transaction.deleteOne();
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
