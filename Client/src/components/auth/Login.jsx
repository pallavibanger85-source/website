import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
  FaQuoteLeft,
  FaSignInAlt,
} from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] =
    useState(false);

  // REGEX
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // FORMIK
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .matches(emailRegex, "Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      alert("Login Successful ✅");

      resetForm();
    },
  });

  return (
    <>
      <div className="min-h-screen pb-10 bg-[#f5f7fb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-3 gap-6 items-center">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex flex-col justify-center h-full px-4">

              <FaQuoteLeft className="text-[90px] text-blue-600 mb-8" />

              <h1 className="text-6xl font-bold leading-tight text-gray-900">
                Welcome Back to{" "}
                <span className="text-blue-600">
                  QuoteHub
                </span>
              </h1>

             

              <div className="w-36 h-1 bg-blue-600 rounded-full mt-10"></div>

              {/* ARROW */}
              <div className="mt-16">
                <svg
                  width="250"
                  height="120"
                  viewBox="0 0 250 120"
                  fill="none"
                >
                  <path
                    d="M10 30C80 30 70 110 150 110C210 110 200 40 240 40"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeDasharray="10 10"
                    strokeLinecap="round"
                  />

                  <path
                    d="M228 25L242 40L228 55"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* LOGIN FORM */}
            <div className="bg-white rounded-[28px] shadow-xl border border-gray-100 px-8 py-8 w-full">

              {/* TOP */}
              <div className="text-center mb-8">

                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <FaSignInAlt className="text-2xl text-blue-600" />
                </div>

                <h2 className="text-4xl font-bold text-gray-900">
                  Login
                </h2>

                <p className="text-gray-500 mt-3 text-lg">
                  Welcome back to QuoteHub
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-5"
              >

                {/* EMAIL */}
                <div>
                  <label className="text-gray-800 font-semibold">
                    Email Address
                  </label>

                  <div className="relative mt-2">

                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-4 text-lg outline-none focus:ring-4
                      ${
                        formik.touched.email &&
                        formik.errors.email
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                      }`}
                    />
                  </div>

                  {formik.touched.email &&
                    formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-gray-800 font-semibold">
                    Password
                  </label>

                  <div className="relative mt-2">

                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Enter password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-14 text-lg outline-none focus:ring-4
                      ${
                        formik.touched.password &&
                        formik.errors.password
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>

                  {formik.touched.password &&
                    formik.errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.password}
                      </p>
                    )}
                </div>

                {/* FORGOT PASSWORD */}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-4 rounded-2xl text-lg font-semibold"
                >
                  Login
                </button>

                {/* DIVIDER */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[1px] bg-gray-200"></div>

                  <span className="text-gray-400">
                    or continue with
                  </span>

                  <div className="flex-1 h-[1px] bg-gray-200"></div>
                </div>

                {/* SOCIAL */}
                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    className="border border-gray-200 rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-gray-50"
                  >
                    <FaGoogle className="text-red-500" />

                    <span className="font-medium">
                      Google
                    </span>
                  </button>

                  <button
                    type="button"
                    className="border border-gray-200 rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-gray-50"
                  >
                    <FaApple />

                    <span className="font-medium">
                      Apple
                    </span>
                  </button>
                </div>

                {/* SIGNUP */}
                <p className="text-center text-gray-500">
                  Don’t have an account?{" "}

                  <Link
                    to="/signup"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Signup
                  </Link>
                </p>
              </form>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden lg:flex flex-col justify-center items-center text-center px-6">

              <FaQuoteLeft className="text-[80px] text-blue-500 mb-8" />

              <h2 className="text-5xl italic text-gray-700 leading-relaxed">
                
                Start reading today!
              </h2>

              <div className="w-52 h-1 bg-blue-500 rounded-full mt-10"></div>

              {/* DOTS */}
              <div className="grid grid-cols-6 gap-3 mt-16 opacity-50">
                {Array.from({ length: 36 }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    ></div>
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}