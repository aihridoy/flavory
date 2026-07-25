"use client";

import Link from "next/link";
import React, { useState } from "react";
import { registerUser } from "../action";
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
              Join Flavory
            </h1>
            <p className="text-white/80">
              Create your account to save favorite recipes, share your own, and join our community of food lovers.
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
              Create Account
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Start your culinary journey with us today
            </p>
          </div>

          {/* Success/Error Messages */}
          {message && (
            <div className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-3 ${
              message.includes("successful") ? "" : ""
            }`}
                 style={{
                   background: message.includes("successful") ? '#dcfce7' : 'var(--color-primary-50)',
                   color: message.includes("successful") ? '#16a34a' : 'var(--color-primary)',
                 }}>
              <span className="text-lg">{message.includes("successful") ? "&#10003;" : "&#9888;"}</span>
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2"
                       style={{ color: 'var(--color-text-primary)' }}>
                  First Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2"
                          size={18} style={{ color: 'var(--color-text-tertiary)' }} />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="input-field pl-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2"
                       style={{ color: 'var(--color-text-primary)' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="input-field"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
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
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-tertiary)' }}>
            By creating an account, you agree to our{" "}
            <a href="#" className="underline" style={{ color: 'var(--color-primary)' }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="underline" style={{ color: 'var(--color-primary)' }}>Privacy Policy</a>
          </p>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--color-border)' }} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4" style={{ background: 'var(--color-surface)', color: 'var(--color-text-tertiary)' }}>
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            Sign In Instead
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
