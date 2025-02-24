import React from 'react';

const Navbar = () => {
    return (
        <nav>
    <div class="container flex justify-between py-6">
      <a href="index.html">
        <img src="/assets/images/logo.png" alt="" class="object-cover h-[40px]" />
      </a>

      <ul class="flex gap-4 text-sm text-gray-500">
        <li class="py-2 active">
          <a href="./index.html">Home</a>
        </li>

        <li class="py-2">
          <a href="./index.html">Recipe</a>
        </li>

        <li class="py-2">
          <a href="./index.html">About us</a>
        </li>

        <li class="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center">
          <a href="./login.html">Login</a>
        </li>
      </ul>
    </div>
  </nav>
    );
};

export default Navbar;