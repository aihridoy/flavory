import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav>
    <div class="container flex justify-between py-6">
      <Link href="/">
        <img src="/assets/images/logo.png" alt="" class="object-cover h-[40px]" />
      </Link>

      <ul class="flex gap-4 text-sm text-gray-500">
        <li class="py-2 active">
          <Link href="/">Home</Link>
        </li>

        <li class="py-2">
          <Link href="/categorized">Recipe</Link>
        </li>

        <li class="py-2">
          <Link href="/">About us</Link>
        </li>

        <li class="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center">
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </div>
  </nav>
    );
};

export default Navbar;