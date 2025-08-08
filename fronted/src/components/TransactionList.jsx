import React, { useState } from "react";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const getCategoryDisplay = (categoryName) => {
    const icon = [categoryName] || "💰";
    return `${categoryName}`;
  };

  // Function to handle delete with confirmation and custom alert
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      onDelete(id);
      setAlert({
        show: true,
        message: "Transaction deleted successfully!",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  // Function to close alert manually
  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", type: "" });
  };

  return (
    <div className="p-4 sm:p-8 rounded-2xl max-w-7xl mx-auto">
      {/* Alert Message */}
      {alert.show && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-white flex items-center justify-between gap-2 transition-all duration-300 w-11/12 sm:w-full max-w-md z-50 bg-opacity-90 ${
            alert.type === "success"
              ? "bg-green-500"
              : alert.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>
              {alert.type === "success" && "✅"}
              {alert.type === "error" && "❌"}
              {alert.type === "info" && "ℹ️"}
            </span>
            <span className="text-sm sm:text-base">{alert.message}</span>
          </div>
          <button
            onClick={handleCloseAlert}
            className="text-white hover:text-gray-200 focus:outline-none cursor-pointer"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="mb-6 sm:mb-8 text-center max-sm:mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Transaction History
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden rounded-xl border border-gray-700 shadow-lg">
        <table className="w-full">
          <thead className="border-b border-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Payment Mode
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">
                      No transactions yet
                    </h3>
                    <p className="text-gray-400">
                      Your transaction history will appear here
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        txn.type === "income"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {txn.type === "income" ? "💰" : "💸"} {txn.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-lg font-bold ${
                        txn.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {txn.type === "income" ? "+" : "-"}₹{txn.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white font-medium">
                      {txn.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {getCategoryDisplay(txn.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      {txn.paymentMode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                    {new Date(txn.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(txn)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(txn._id)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden max-sm:mb-10">
        {transactions.length === 0 ? (
          <div className="text-center py-12  bg-gray-800 rounded-xl border border-gray-700">
            <div className="text-4xl sm:text-6xl mb-4">📊</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No transactions yet
            </h3>
            <p className="text-gray-500 text-sm sm:text-base px-4">
              Your transaction history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4 ">
            {transactions.map((txn) => (
              <div
                key={txn._id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      txn.type === "income"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {txn.type === "income" ? "💰" : "💸"} {txn.type}
                  </span>
                  <span
                    className={`text-lg sm:text-xl font-bold ${
                      txn.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {txn.type === "income" ? "+" : "-"}₹{txn.amount}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <div className="text-sm sm:text-base text-white font-medium">
                    {txn.description}
                  </div>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {getCategoryDisplay(txn.category)}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                    {txn.paymentMode}
                  </span>
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">
                    {new Date(txn.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(txn)}
                      className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                    >
                      <span className="mr-1">✏️</span>
                      <span className="hidden xs:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(txn._id)}
                      className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                    >
                      <span className="mr-1">🗑️</span>
                      <span className="hidden xs:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;