"use client";

import Link from "next/link";
import React, { useState } from "react";
import { registerUser } from "../action";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await registerUser(formData);

    if (result.success) {
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
        <h4 className="font-bold text-2xl">Sign Up</h4>

        {message && <p className="text-center text-sm text-red-500 my-2">{message}</p>}

        <form className="login-form space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block font-medium text-sm text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block font-medium text-sm text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-sm text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#eb4a36] py-3 rounded-md text-white w-full mt-4 hover:bg-[#d63e2a] transition"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">Or</p>

        <Link href="/login" className="underline text-sm mx-auto block text-gray-600 mt-4 text-center">
          Login
        </Link>
      </div>
    </section>
  );
};

export default RegisterPage;