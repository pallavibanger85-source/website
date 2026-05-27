import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import {showSuccessToast,showErrorToast} from '../'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
  FaQuoteLeft,
  FaVenusMars,
} from "react-icons/fa";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // FORMIK
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Name is required"),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Passwords must match"
        )
        .required("Confirm password is required"),

      gender: Yup.string().required(
        "Gender is required"
      ),
    }),

    // SUBMIT
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Form Data:", values);

        API CALL EXAMPLE
        const response = await axios.post(
          "http://localhost:5000/api/signup",
          values
        );

        alert("Signup Successful ✅");

        resetForm();
      } catch (error) {
        console.error("Signup Error:", error);

        alert(
          error?.response?.data?.message ||
            "Something went wrong ❌"
        );
      }
    },
  });

  return (
    <>
      {/* MAIN */}
      <div className="min-h-screen pb-10 bg-[#f5f7fb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 items-center">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex flex-col justify-center h-full px-4">
              <FaQuoteLeft className="text-[90px] text-blue-600 mb-8" />

              <h1 className="text-6xl font-bold leading-tight text-gray-900">
                Join{" "}
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

            {/* FORM */}
            <div className="bg-white rounded-[28px] shadow-xl border border-gray-100 px-8 py-8 w-full">
              
              {/* TOP */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-2xl text-blue-600" />
                </div>

                <h2 className="text-4xl font-bold text-gray-900">
                  Create Account
                </h2>

                <p className="text-gray-500 mt-3 text-lg">
                  Sign up to get started with QuoteHub
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-5"
              >

                {/* NAME */}
                <div>
                  <label className="text-gray-800 font-semibold">
                    Full Name
                  </label>

                  <div className="relative mt-2">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-4 text-lg outline-none focus:ring-4
                      ${
                        formik.touched.name &&
                        formik.errors.name
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                      }`}
                    />
                  </div>

                  {formik.touched.name &&
                    formik.errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.name}
                      </p>
                    )}
                </div>

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
                      placeholder="Create password"
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

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="text-gray-800 font-semibold">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={
                        formik.values.confirmPassword
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-14 text-lg outline-none focus:ring-4
                      ${
                        formik.touched
                          .confirmPassword &&
                        formik.errors
                          .confirmPassword
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>

                  {formik.touched
                    .confirmPassword &&
                    formik.errors
                      .confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          formik.errors
                            .confirmPassword
                        }
                      </p>
                    )}
                </div>

                {/* GENDER */}
                <div>
                  <label className="text-gray-800 font-semibold">
                    Gender
                  </label>

                  <div className="relative mt-2">
                    <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <select
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-4 text-lg outline-none focus:ring-4 appearance-none
                      ${
                        formik.touched.gender &&
                        formik.errors.gender
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-500"
                      }`}
                    >
                      <option value="">
                        Select Gender
                      </option>

                      <option value="male">
                        Male
                      </option>

                      <option value="female">
                        Female
                      </option>

                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>

                  {formik.touched.gender &&
                    formik.errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.gender}
                      </p>
                    )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-4 rounded-2xl text-lg font-semibold"
                >
                  Create Account
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

                {/* LOGIN */}
                <p className="text-center text-gray-500">
                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden lg:flex flex-col justify-center items-center text-center px-6">
              <FaQuoteLeft className="text-[80px] text-blue-500 mb-8" />

              <h2 className="text-3xl italic text-gray-700 leading-relaxed">
                Be part of a community
                <br />
                that inspires!
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