import React, { useState, useEffect } from "react";
import "./TransactionForm.css"

const TransactionForm = ({ onAdd, onUpdate, editTxn }) => {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    description: "",
    category: "",
    paymentMode: "cash",
  });

  // Category options based on transaction type
  const categories = {
    income: ["Salary", "Business", "Investment", "Freelance", "Gift", "Other"],
    expense: [
      "Food",
      "Transport",
      "Shopping",
      "Bills",
      "Entertainment",
      "Health",
      "Education",
      "Other",
    ],
  };

  // Enhanced payment mode options
  const paymentModes = [
    { value: "cash", label: "💵 Cash" },
    { value: "upi", label: "📱 UPI" },
    { value: "card", label: "💳 Card" },
    { value: "netbanking", label: "🏦 Net Banking" },
    { value: "wallet", label: "👛 Digital Wallet" },
    { value: "cheque", label: "📄 Cheque" },
  ];

  useEffect(() => {
    if (editTxn) {
      setForm({
        type: editTxn.type,
        amount: editTxn.amount,
        description: editTxn.description,
        category: editTxn.category,
        paymentMode: editTxn.paymentMode,
      });
    }
  }, [editTxn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("📤 Form data before submit:", form); // ✅ Yeh line lagani hai
      if (editTxn) {
        onUpdate({ ...form, _id: editTxn._id, amount: Number(form.amount) });
      } else {
        onAdd({ ...form, amount: Number(form.amount) });
      }

      // Reset form
      setForm({
        type: "income",
        amount: "",
        description: "",
        category: "",
        paymentMode: "cash",
      });
    } catch (err) {
      console.error("Transaction error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl text-white">
                {editTxn ? "✏️" : "💰"}
              </span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {editTxn ? "Edit Transaction" : "Add New Transaction"}
            </h2>
            <p className="text-gray-500 mt-2">
              {editTxn
                ? "Update your transaction details"
                : "Track your income and expenses"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Transaction Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`relative cursor-pointer ${
                    form.type === "income" ? "ring-2 ring-green-500" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={form.type === "income"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                      form.type === "income"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white hover:border-green-300"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">💚</span>
                    <span className="font-semibold">Income</span>
                  </div>
                </label>
                <label
                  className={`relative cursor-pointer ${
                    form.type === "expense" ? "ring-2 ring-red-500" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={form.type === "expense"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                      form.type === "expense"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 bg-white hover:border-red-300"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">❤️</span>
                    <span className="font-semibold">Expense</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  onWheel={(e) => e.target.blur()}
                  placeholder="0.00"
                  required
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg font-semibold"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="What was this transaction for?"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {categories[form.type]?.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Payment Mode */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Payment Method
              </label>
              <div className="relative">
                <select
                  name="paymentMode"
                  value={form.paymentMode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white cursor-pointer"
                >
                  {paymentModes.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
            >
              <span className="inline-flex items-center justify-center">
                {editTxn ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Update Transaction
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Transaction
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
