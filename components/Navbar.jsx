"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/action";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
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
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            className="object-cover h-[40px]"
          />
        </Link>

        <ul className="flex gap-6 text-sm text-gray-500">
          {[
            { name: "Home", path: "/" },
            { name: "Recipe", path: "/categorized" },
            { name: "About Us", path: "/about" },
          ].map((menu) => (
            <li key={menu.path} className="py-2">
              <Link
                href={menu.path}
                className={`relative px-4 py-2 transition-all duration-300 ${
                  pathname === menu.path
                    ? "text-gray-900 font-semibold border-b-2 border-[#eb4a36]"
                    : "hover:text-gray-700"
                }`}
              >
                {menu.name}
              </Link>
            </li>
          ))}

          {session ? (
            <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white cursor-pointer">
              <button onClick={handleLogout} disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
              </button>
            </li>
          ) : (
            <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white">
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;