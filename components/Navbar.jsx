"use client";
import React from "react";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutUser } from "@/app/action";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const result = await logoutUser();
    if (result.success) {
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex justify-between py-6 items-center">
        <Link href="/">
          <img src="/assets/images/logo.png" alt="Logo" className="object-cover h-[40px]" />
        </Link>

        <ul className="flex gap-4 text-sm text-gray-500">
          <li className="py-2">
            <Link href="/">Home</Link>
          </li>

          <li className="py-2">
            <Link href="/categorized">Recipe</Link>
          </li>

          <li className="py-2">
            <Link href="/">About us</Link>
          </li>

          {session ? (
            <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center cursor-pointer">
              <button onClick={handleLogout} disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
              </button>
            </li>
          ) : (
            <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center">
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;