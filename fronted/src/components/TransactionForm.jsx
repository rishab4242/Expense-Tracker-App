import React, { useState, useEffect } from "react";
import "./TransactionForm.css";

const TransactionForm = ({ onAdd, onUpdate, editTxn, onCancelEdit }) => {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    description: "",
    category: "",
    paymentMode: "cash",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // Category options based on transaction type
  const categories = {
    income: [
      "💼 Salary",
      "🏢 Business",
      "📈 Investment",
      "💻 Freelance",
      "🎁 Gift",
      "🏠 Rental Income",
      "💸 Bonus",
      "🎯 Commission",
      "💰 Other",
    ],
    expense: [
      "🍽️ Food",
      "🚗 Transport",
      "🛍️ Shopping",
      "📄 Bills",
      "🎬 Entertainment",
      "🏥 Health",
      "📚 Education",
      "🏠 Rent",
      "⛽ Fuel",
      "👕 Clothing",
      "🎮 Gaming",
      "💳 Other",
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
    { value: "creditcard", label: "💎 Credit Card" },
    { value: "debitcard", label: "🏧 Debit Card" },
    { value: "banktransfer", label: "🏪 Bank Transfer" },
    { value: "crypto", label: "₿ Cryptocurrency" },
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

  // Show alert and auto-dismiss after 3 seconds
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Function to close alert manually
  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", type: "" });
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Amount validation
    if (!form.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    } else if (Number(form.amount) > 10000000) {
      newErrors.amount = "Amount cannot exceed ₹1,00,00,000";
    }

    // Description validation
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    } else if (form.description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters";
    } else if (form.description.trim().length > 100) {
      newErrors.description = "Description cannot exceed 100 characters";
    }

    // Category validation
    if (!form.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Reset category when transaction type changes
    if (name === "type" && form.type !== value) {
      setForm((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      showAlert("Please fix the errors in the form", "error");
      return;
    }

    try {
      if (editTxn) {
        onUpdate({ ...form, _id: editTxn._id, amount: Number(form.amount) });
        showAlert("Transaction updated successfully!", "success");
      } else {
        onAdd({ ...form, amount: Number(form.amount) });
        showAlert("Transaction added successfully!", "success");
      }

      // Reset form
      setForm({
        type: "income",
        amount: "",
        description: "",
        category: "",
        paymentMode: "cash",
      });
      setErrors({});
    } catch (err) {
      console.error("Transaction error:", err.message);
      showAlert("Failed to process transaction", "error");
    }
  };

  const handleCancel = () => {
    // Reset form to initial state
    setForm({
      type: "income",
      amount: "",
      description: "",
      category: "",
      paymentMode: "cash",
    });
    setErrors({});

    // Call parent cancel function - this will clear editTxn prop
    if (onCancelEdit) {
      onCancelEdit();
      showAlert("Edit cancelled", "info");
    }
  };

  return (
    <div className="min-h-screen md:p-4">
      <div className="max-w-2xl mx-auto">
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
              <span>{alert.message}</span>
            </div>
            <button
              onClick={handleCloseAlert}
              className="text-white hover:text-gray-200 focus:outline-none cursor-pointer"
            >
              <svg
                className="w-5 h-5"
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

        <form onSubmit={handleSubmit}>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300">
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
                    className={`w-full bg-white pl-8 pr-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-200 text-lg font-semibold ${
                      errors.amount
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.amount}
                  </p>
                )}
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
                  className={`w-full bg-white px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-200 ${
                    errors.description
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.description}
                  </p>
                )}
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-200 appearance-none bg-white cursor-pointer ${
                      errors.category
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                    }`}
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
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.category}
                  </p>
                )}
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

            {/* Submit and Cancel Buttons */}
            <div className="mt-8">
              {editTxn ? (
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-3 md:px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 md:text-lg"
                  >
                    <span className="inline-flex items-center justify-center">
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </span>
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-3 md:px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 md:text-lg"
                  >
                    <span className="inline-flex items-center justify-center">
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
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
                >
                  <span className="inline-flex items-center justify-center">
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
                  </span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
