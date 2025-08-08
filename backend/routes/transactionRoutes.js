const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getSummary,
} = require("../controller/transactionController");

// Add authMiddleware here 👇
router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);
router.delete("/:id", authMiddleware, deleteTransaction);
router.put("/:id", authMiddleware, updateTransaction);
router.get("/summary", authMiddleware, getSummary);

module.exports = router;
