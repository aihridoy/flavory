"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/action";
import { FiMenu, FiX, FiUser, FiLogOut, FiHeart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    const result = await logoutUser();
    if (result.success) {
      router.refresh();
    }
    setLoading(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/categorized" },
    { name: "About", path: "/about-us" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm"
          : "bg-black/20 backdrop-blur-sm"
      }`}
      style={{ height: "var(--navbar-height)" }}
    >
      <div className="container h-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: "var(--gradient-primary)" }}
          >
            <span
              className="text-white font-bold text-base"
              style={{ fontFamily: "var(--font-display)" }}
            >
              F
            </span>
          </div>
          <span
            className="text-xl font-semibold tracking-tight transition-colors duration-300"
            style={{
              fontFamily: "var(--font-display)",
              color: isScrolled ? "var(--color-text-primary)" : "white",
            }}
          >
            Flavory
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((menu) => {
            const isActive = pathname === menu.path;
            return (
              <Link
                key={menu.path}
                href={menu.path}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive
                    ? "white"
                    : isScrolled
                    ? "var(--color-text-secondary)"
                    : "rgba(255,255,255,0.9)",
                  background: isActive
                    ? "var(--gradient-primary)"
                    : isScrolled
                    ? "transparent"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                {menu.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/favorites"
                aria-label="My favorites"
                className="p-2.5 rounded-lg transition-all duration-200"
                style={{
                  color: pathname === "/favorites"
                    ? "var(--color-primary)"
                    : isScrolled
                    ? "var(--color-text-secondary)"
                    : "rgba(255,255,255,0.9)",
                  background: pathname === "/favorites"
                    ? "var(--color-primary-50)"
                    : isScrolled
                    ? "var(--color-surface-muted)"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <FiHeart size={16} fill={pathname === "/favorites" ? "currentColor" : "none"} />
              </Link>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  background: isScrolled
                    ? "var(--color-surface-muted)"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {session.user?.name?.charAt(0)?.toUpperCase() || (
                    <FiUser size={14} />
                  )}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isScrolled
                      ? "var(--color-text-primary)"
                      : "white",
                  }}
                >
                  {session.user?.name?.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  color: isScrolled
                    ? "var(--color-text-secondary)"
                    : "rgba(255,255,255,0.9)",
                  background: isScrolled
                    ? "transparent"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <FiLogOut size={16} />
                {loading ? "..." : "Logout"}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
              style={{
                background: isScrolled ? "var(--gradient-primary)" : "white",
                color: isScrolled ? "white" : "var(--color-primary)",
                boxShadow: isScrolled
                  ? "none"
                  : "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              <FiUser size={16} />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-colors duration-200"
          style={{
            color: isScrolled ? "var(--color-text-primary)" : "white",
            background: isScrolled
              ? "var(--color-surface-muted)"
              : "rgba(255,255,255,0.1)",
          }}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t"
            style={{ borderColor: "var(--color-border-light)" }}
          >
            <div className="container py-4 space-y-2">
              {navLinks.map((menu) => (
                <Link
                  key={menu.path}
                  href={menu.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === menu.path ? "text-white" : ""
                  }`}
                  style={{
                    color:
                      pathname === menu.path
                        ? "white"
                        : "var(--color-text-secondary)",
                    background:
                      pathname === menu.path
                        ? "var(--gradient-primary)"
                        : "transparent",
                  }}
                >
                  {menu.name}
                </Link>
              ))}

              <div
                className="pt-2 border-t"
                style={{ borderColor: "var(--color-border-light)" }}
              >
                {session ? (
                  <div className="space-y-2">
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-lg"
                      style={{ background: "var(--color-surface-muted)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ background: "var(--gradient-primary)" }}
                      >
                        {session.user?.name?.charAt(0)?.toUpperCase() || (
                          <FiUser size={18} />
                        )}
                      </div>
                      <div>
                        <p
                          className="font-medium"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {session.user?.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/favorites"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        color: pathname === "/favorites" ? "white" : "var(--color-text-secondary)",
                        background: pathname === "/favorites" ? "var(--gradient-primary)" : "var(--color-surface-muted)",
                      }}
                    >
                      <FiHeart size={16} />
                      My Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200"
                      style={{
                        color: "var(--color-primary)",
                        background: "var(--color-primary-50)",
                      }}
                    >
                      <FiLogOut size={16} />
                      {loading ? "Logging out..." : "Sign Out"}
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary block text-center text-sm"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
