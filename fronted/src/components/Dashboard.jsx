import React from "react";

const Dashboard = ({ summary }) => {
  const balance = summary.income - summary.expense;

  return (
    <div className=" rounded-xl shadow-lg  p-4 mb-4 text-center backdrop-blur-sm mt-14">
      <div className="mb-4">
        <h2 className="text-[25px]  md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
          Transaction Summary
        </h2>
        <div className="w-12 h-0.5  bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Income Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200 transform hover:scale-105 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            </div>
          </div>
          <div className="text-md font-medium text-emerald-600 mb-1">
            Income
          </div>
          <div className="text-lg font-bold text-emerald-700">
            ₹{summary.income}
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200 transform hover:scale-105 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </div>
          </div>
          <div className="text-md font-medium text-red-600 mb-1">Expense</div>
          <div className="text-lg font-bold text-red-700">
            ₹{summary.expense}
          </div>
        </div>

        {/* Balance Card */}
        <div
          className={`bg-gradient-to-br ${
            balance >= 0
              ? "from-blue-50 to-blue-100 border-blue-200"
              : "from-orange-50 to-orange-100 border-orange-200"
          } rounded-lg p-4 border transform hover:scale-105 transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex items-center justify-center mb-2">
            <div
              className={`w-8 h-8 ${
                balance >= 0 ? "bg-blue-500" : "bg-orange-500"
              } rounded-full flex items-center justify-center`}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <div
            className={`text-md font-medium ${
              balance >= 0 ? "text-blue-600" : "text-orange-600"
            } mb-1`}
          >
            Balance
          </div>
          <div
            className={`text-lg font-bold ${
              balance >= 0 ? "text-blue-700" : "text-orange-700"
            }`}
          >
            ₹{balance}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
