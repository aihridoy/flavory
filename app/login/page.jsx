"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../action";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const result = await loginUser(formData);

    if (!result.success) {
      setError("Invalid email or password. Please try again.");
    }

    if (result.success) {
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="/assets/images/cover.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.75) 100%)' }} />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                 style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
              <span className="text-white font-bold text-2xl" style={{ fontFamily: 'var(--font-display)' }}>F</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4"
                style={{ fontFamily: 'var(--font-display)' }}>
              Welcome Back
            </h1>
            <p className="text-white/80">
              Sign in to access your saved recipes and continue your culinary journey.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8"
           style={{ background: 'var(--color-surface)' }}>
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: 'var(--gradient-primary)' }}>
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>F</span>
              </div>
              <span className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                Flavory
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              Sign In
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
                 style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
              <span className="text-lg">&#9888;</span>
              {error}
            </div>
          )}

          {message && (
            <div className="p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
                 style={{ background: '#dcfce7', color: '#16a34a' }}>
              <span className="text-lg">&#10003;</span>
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--color-text-primary)' }}>
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2"
                        size={18} style={{ color: 'var(--color-text-tertiary)' }} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--color-text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2"
                        size={18} style={{ color: 'var(--color-text-tertiary)' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--color-border)' }} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4" style={{ background: 'var(--color-surface)', color: 'var(--color-text-tertiary)' }}>
                Don&apos;t have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            href="/register"
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
