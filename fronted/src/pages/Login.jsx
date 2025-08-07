import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { baseURL } from "../utils/constant";
import { useNavigate, Link } from "react-router-dom"; // Added Link import

// Welcome Modal Component
const WelcomeModal = ({ onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes checkmark {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .welcome-content {
          animation: fadeInScale 0.6s ease-out 0.8s both;
        }
        .welcome-icon {
          animation: fadeInScale 0.8s ease-out 0.2s both;
        }
      `}</style>

      <div
        className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black transition-all duration-500 z-50 px-4 ${
          mounted ? "bg-opacity-100" : "bg-opacity-0"
        }`}
      >
        <div
          className={`bg-white rounded-2xl w-96 max-w-full shadow-2xl text-center relative transform transition-all duration-500 overflow-hidden ${
            mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          {/* Background Pattern - matching login form */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -mr-16 -mt-16"></div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto border-3 border-white welcome-icon">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-normal text-white tracking-wider">
              SUCCESS
            </h2>
          </div>
          <div className="px-8 py-8 relative z-10">
            <div className="welcome-content">
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Welcome back! You're successfully logged in to your Todo App.
                Let's get organized and productive!
              </p>
            </div>
            <div className="welcome-content">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-500 hover:shadow-xl text-white px-12 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

// Custom Field Component with Error Display
const CustomField = ({ name, type = "text", placeholder, errors, touched }) => {
  const hasError = errors[name] && touched[name];

  return (
    <div>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="flex items-center mt-1">
            <span className="text-red-500 text-sm">{msg}</span>
            <svg
              className="w-4 h-4 text-red-500 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

const Login = ({ setIsLoggedIn }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  // Check token on mount (handles refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setGeneralError(""); // Clear previous general error

    try {
      const res = await axios.post(`${baseURL}/login`, values);

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setShowWelcome(true);
      } else {
        setGeneralError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setGeneralError(
        "Oops! This user doesn't exist yet. Please sign up to create your account 😊"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center  min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4">
      <div
        className={`bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden transition-all duration-500 ${
          showWelcome
            ? "blur-sm scale-95 opacity-60"
            : "blur-none scale-100 opacity-100"
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -mr-16 -mt-16"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                {/* Email Field */}
                <CustomField
                  name="email"
                  type="email"
                  placeholder="Email"
                  errors={errors}
                  touched={touched}
                />

                {/* Password Field */}
                <CustomField
                  name="password"
                  type="password"
                  placeholder="Password"
                  errors={errors}
                  touched={touched}
                />

                {/* General Error Message */}
                {generalError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-red-700 text-sm">
                        {generalError}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing In...
                    </div>
                  ) : (
                    "Log In"
                  )}
                </button>

                <p className="mt-6 text-sm text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {showWelcome && <WelcomeModal onClose={handleWelcomeClose} />}
    </div>
  );
};

export default Login;
