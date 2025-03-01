import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <section className="h-screen grid place-items-center">
      <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
        <h4 className="font-bold text-2xl">Sign in</h4>
        <form className="login-form">
          <div>
            <label for="email">Email Address</label>
            <input type="email" name="email" id="email" />
          </div>

          <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <button type="submit" className="bg-[#eb4a36] py-3 rounded-md text-white w-full mt-4">Login</button>
        </form>

        <p className="text-center text-xs text-gray-600">Or</p>

        <Link href="/register" className="underline text-sm mx-auto block text-gray-600 mt-4 text-center">
          Create New Account
        </Link>
      </div>
    </section>
    );
};

export default page;