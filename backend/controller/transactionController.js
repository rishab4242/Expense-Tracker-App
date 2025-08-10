const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { amount, type, category, paymentMode, description } = req.body;

    const newTxn = new Transaction({
      userId,
      amount,
      type,
      category,
      paymentMode,
      description,
    });

    await newTxn.save();
    res.status(201).json(newTxn);
  } catch (err) {
    console.error("Error in addTransaction:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};


exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const txns = await Transaction.find({ userId }).sort({
      createdAt: -1,
    });
    res.json(txns);
  } catch (err) {
    console.error("Error in getTransactions:", err.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const txn = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId, 
    });

    if (!txn) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const updatedTxn = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updatedTxn) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(updatedTxn);
  } catch (err) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.userId;
    const txns = await Transaction.find({ userId });
    const income = txns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = txns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    res.json({ income, expense });
  } catch (err) {
    console.error("Error in getSummary:", err.message);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};
