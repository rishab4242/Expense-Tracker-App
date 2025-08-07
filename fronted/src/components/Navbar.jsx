import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("You have been successfully logged out.", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      style: {
        background: "#d4edda",
        color: "#155724",
        fontSize: window.innerWidth < 768 ? "14px" : "16px",
        fontWeight: "normal",
        textAlign: "center",
        border: "1px solid #c3e6cb",
        borderRadius: "8px",
        minWidth: window.innerWidth < 768 ? "280px" : "400px",
        maxWidth: window.innerWidth < 768 ? "90vw" : "400px",
        padding: window.innerWidth < 768 ? "12px 16px" : "15px 20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        margin: window.innerWidth < 768 ? "20px 10px 0 10px" : "20px 0 0 0",
      },
      icon: false,
      className: "custom-toast",
      closeButton: ({ closeToast }) => (
        <button
          onClick={closeToast}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: "#000000",
            fontSize: "18px",
            fontWeight: "bold",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            marginLeft: "0",
            zIndex: 1,
          }}
        >
          ×
        </button>
      ),
    });

    // Then remove token and update state
    localStorage.removeItem("token");
    setIsLoggedIn(false);

    // Navigate after showing toast
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="p-4 text-white fixed top-0 z-50 flex justify-between items-center border-none outline-none w-full">
      <h2
        className="md:text-2xl text-lg font-bold cursor-pointer hover:text-blue-400 md:ml-4 transition-colors duration-200"
        onClick={() => navigate("/")}
      >
        My Todo App
      </h2>
      <div className="space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg relative md:right-[12px] max-sm:left-[5px] hover:bg-red-600 transition-all duration-200 transform hover:scale-105 font-medium"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-blue-400 transition-colors duration-200 font-medium text-base md:text-xl relative right-[40px] max-sm:left-[5px]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-blue-400 transition-colors duration-200 font-medium text-base md:text-xl relative right-[10px] max-sm:left-[5px]"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
