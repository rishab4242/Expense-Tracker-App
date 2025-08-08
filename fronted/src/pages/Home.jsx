import React, { useState, useEffect } from "react";
import axios from "../services/api";
import Dashboard from "../components/Dashboard";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [editTxn, setEditTxn] = useState(null);

  // ✅ Calculate summary locally
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
      calculateSummary(res.data); // ✅ summary update
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

      setTransactions((prev) => [res.data, ...prev]);

      // ✅ summary update manually
      const amt = Number(res.data.amount);
      if (res.data.type === "income") {
        setSummary((prev) => ({ ...prev, income: prev.income + amt }));
      } else {
        setSummary((prev) => ({ ...prev, expense: prev.expense + amt }));
      }
    } catch (err) {
      console.error("Error adding transaction:", err.message);
    }
  };

  // ✅ Delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const deletedTxn = transactions.find((txn) => txn._id === id); // 👈 Get before deletion

      await axios.delete(`/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions((prev) => prev.filter((txn) => txn._id !== id));

      // ✅ summary update manually
      const amt = Number(deletedTxn.amount);
      if (deletedTxn.type === "income") {
        setSummary((prev) => ({ ...prev, income: prev.income - amt }));
      } else {
        setSummary((prev) => ({ ...prev, expense: prev.expense - amt }));
      }
    } catch (err) {
      console.error("Error deleting transaction:", err.message);
    }
  };

  // ✅ Set transaction for editing
  const handleEditTransaction = (txn) => {
    setEditTxn(txn);
  };

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

      const updatedData = res.data;

      setTransactions((prev) => {
        const prevTxn = prev.find((txn) => txn._id === updatedTxn._id);

        const oldAmt = Number(prevTxn.amount);
        const newAmt = Number(updatedData.amount);

        let newIncome = summary.income;
        let newExpense = summary.expense;

        // ✅ Remove old txn from summary
        if (prevTxn.type === "income") {
          newIncome -= oldAmt;
        } else {
          newExpense -= oldAmt;
        }

        // ✅ Add updated txn to summary
        if (updatedData.type === "income") {
          newIncome += newAmt;
        } else {
          newExpense += newAmt;
        }

        setSummary({ income: newIncome, expense: newExpense });

        // ✅ Update list
        return prev.map((txn) =>
          txn._id === updatedTxn._id ? updatedData : txn
        );
      });

      setEditTxn(null);
    } catch (err) {
      console.error("Error updating transaction:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <Dashboard summary={summary} />
      <TransactionForm
        onAdd={handleAddTransaction}
        onUpdate={handleUpdateTransaction}
        editTxn={editTxn}
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
