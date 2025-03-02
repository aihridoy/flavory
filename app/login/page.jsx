"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../action";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await loginUser(formData);

    if (result.success) {
      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    } else {
      setMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md shadow-md">
        <h4 className="font-bold text-2xl text-center">Sign in</h4>

        {message && (
          <p
            className={`text-center text-sm my-2 ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium text-sm text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb4a36]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#eb4a36]"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#eb4a36] py-3 rounded-md text-white w-full mt-4 hover:bg-[#d63e2a] transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">Or</p>

        <Link href="/register" className="underline text-sm mx-auto block text-gray-600 mt-4 text-center">
          Create New Account
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;