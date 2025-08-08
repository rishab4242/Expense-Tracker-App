import React from "react";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">
        Transaction History
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Payment Mode</th>
            <th>Date</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{txn.type}</td>
              <td>₹{txn.amount}</td>
              <td>{txn.description}</td>
              <td>{txn.category}</td>
              <td>{txn.paymentMode}</td>
              <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
              <td className="text-right">
                <button
                  onClick={() => onEdit(txn)}
                  className="bg-yellow-400 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(txn._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
