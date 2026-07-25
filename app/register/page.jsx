"use client";

import Link from "next/link";
import React, { useState } from "react";
import { registerUser } from "../action";
import { validateEmail, validateName, validatePassword } from "../lib/validators";
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      firstName: validateName(formData.firstName, "First name"),
      lastName: validateName(formData.lastName, "Last name"),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    if (Object.values(errors).some(Boolean)) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const result = await registerUser(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setError(result.message || "Registration failed. Please try again.");
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
      <div className="flex-1 flex items-center justify-center px-6 py-10 sm:p-8"
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
          {success && (
            <div className="p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
                 style={{ background: '#dcfce7', color: '#16a34a' }}>
              <span className="text-lg">&#10003;</span>
              Registration successful! Redirecting to sign in&hellip;
            </div>
          )}
          {error && (
            <div className="p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
                 style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
              <span className="text-lg">&#9888;</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2"
                       style={{ color: 'var(--color-text-primary)' }}>
                  First Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          size={18} />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`input-field pl-12 ${fieldErrors.firstName ? "input-error" : ""}`}
                  />
                </div>
                {fieldErrors.firstName && (
                  <p className="text-xs mt-1.5" style={{ color: '#dc2626' }}>{fieldErrors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2"
                       style={{ color: 'var(--color-text-primary)' }}>
                  Last Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          size={18} />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={`input-field pl-12 ${fieldErrors.lastName ? "input-error" : ""}`}
                  />
                </div>
                {fieldErrors.lastName && (
                  <p className="text-xs mt-1.5" style={{ color: '#dc2626' }}>{fieldErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--color-text-primary)' }}>
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`input-field pl-12 ${fieldErrors.email ? "input-error" : ""}`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs mt-1.5" style={{ color: '#dc2626' }}>{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2"
                     style={{ color: 'var(--color-text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`input-field pl-12 pr-12 ${fieldErrors.password ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {fieldErrors.password ? (
                <p className="text-xs mt-1.5" style={{ color: '#dc2626' }}>{fieldErrors.password}</p>
              ) : (
                <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  At least 8 characters, with a letter and a number.
                </p>
              )}
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
