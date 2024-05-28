const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required').not().isEmpty(),
      check('amount', 'Amount must be a number').isNumeric({ no_symbols: true }),
      check('amount', 'Amount must be greater than 0').isFloat({ gt: 0 }),
      check('type', 'Type is required').isIn(['income', 'expense']),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, amount, type } = req.body;

    try {
      const newTransaction = new Transaction({
        user: req.user.id,
        description,
        amount,
        type,
      });

      // Use transactions to prevent race conditions
      const session = await Transaction.startSession();
      session.startTransaction();

      try {
        const transaction = await newTransaction.save({ session });
        await session.commitTransaction();
        res.json(transaction);
      } catch (err) {
        await session.abortTransaction();
        console.error('Transaction error:', err.message);
        res.status(500).json({ error: 'Server error' });
      } finally {
        session.endSession();
      }
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Server error' });
    }
  }
);
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('user', 'name') // Populate the user field with the name property
      .sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;