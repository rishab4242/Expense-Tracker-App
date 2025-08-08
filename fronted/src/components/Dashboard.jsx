import React from "react";

const Dashboard = ({ summary }) => {
  const balance = summary.income - summary.expense;

  return (
    <div className="bg-white rounded shadow p-4 mb-6 text-center">
      <h2 className="text-xl font-bold mb-4">Transaction Summary</h2>
      <div className="flex justify-around text-lg">
        <div>Income: ₹{summary.income}</div>
        <div>Expense: ₹{summary.expense}</div>
        <div>Balance: ₹{balance}</div>
      </div>
    </div>
  );
};

export default Dashboard;
