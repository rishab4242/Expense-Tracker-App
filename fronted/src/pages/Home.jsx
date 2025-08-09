import React, { useState, useEffect } from "react";
import axios from "../services/api";
import Dashboard from "../components/Dashboard";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [editTxn, setEditTxn] = useState(null);

  // ✅ Common function to calculate summary from full list
  const calculateSummary = (txns) => {
    const income = txns
      .filter((txn) => txn.type === "income")
      .reduce((acc, txn) => acc + Number(txn.amount), 0);

    const expense = txns
      .filter((txn) => txn.type === "expense")
      .reduce((acc, txn) => acc + Number(txn.amount), 0);

    setSummary({ income, expense });
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
      calculateSummary(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ Add transaction
  const handleAddTransaction = async (newTxn) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/transactions", newTxn, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions((prev) => {
        const newList = [res.data, ...prev];
        calculateSummary(newList);
        return newList;
      });
    } catch (err) {
      console.error("Error adding transaction:", err.message);
    }
  };

  // ✅ Delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions((prev) => {
        const newList = prev.filter((txn) => txn._id !== id);
        calculateSummary(newList);
        return newList;
      });
    } catch (err) {
      console.error("Error deleting transaction:", err.message);
    }
  };

  // ✅ Edit helpers
  const handleEditTransaction = (txn) => setEditTxn(txn);
  const handleCancelEdit = () => setEditTxn(null);

  // ✅ Update transaction
  const handleUpdateTransaction = async (updatedTxn) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `/api/transactions/${updatedTxn._id}`,
        updatedTxn,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions((prev) => {
        const newList = prev.map((txn) =>
          txn._id === updatedTxn._id ? res.data : txn
        );
        calculateSummary(newList);
        return newList;
      });

      setEditTxn(null);
    } catch (err) {
      console.error("Error updating transaction:", err.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <Dashboard summary={summary} />
      <TransactionForm
        onAdd={handleAddTransaction}
        onUpdate={handleUpdateTransaction}
        editTxn={editTxn}
        onCancelEdit={handleCancelEdit}
      />
      <TransactionList
        transactions={transactions}
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
      />
    </div>
  );
};

export default Home;
