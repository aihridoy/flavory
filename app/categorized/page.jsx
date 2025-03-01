import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const page = () => {
    return (
        <>
         <Navbar />
         <main>

<section className="container py-8">
  <div>

    <h3 className="font-semibold text-xl">Appetizers & Snacks</h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">
      <div className="card">
        <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87" className="rounded-md" alt="" />
        <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
        <div className="py-2 flex justify-between text-xs text-gray-500">
          <span>⭐️ 5.0</span>
          <span>By: John Doe</span>
        </div>
      </div>

      <div className="card">
        <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87"className="rounded-md" alt="" />
        <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
        <div className="py-2 flex justify-between text-xs text-gray-500">
          <span>⭐️ 5.0</span>
          <span>By: John Doe</span>
        </div>
      </div>

      <div className="card">
        <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87" className="rounded-md" alt="" />
        <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
        <div className="py-2 flex justify-between text-xs text-gray-500">
          <span>⭐️ 5.0</span>
          <span>By: John Doe</span>
        </div>
      </div>

      <div className="card">
        <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87" className="rounded-md" alt="" />
        <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
        <div className="py-2 flex justify-between text-xs text-gray-500">
          <span>⭐️ 5.0</span>
          <span>By: John Doe</span>
        </div>
      </div>

      <div className="card">
        <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87" className="rounded-md" alt="" />
        <h4 className="my-2">Chef John's Turkey Sloppy Joes</h4>
        <div className="py-2 flex justify-between text-xs text-gray-500">
          <span>⭐️ 5.0</span>
          <span>By: John Doe</span>
        </div>
      </div>
    </div>
  </div>
</section>
</main>
         <Footer />   
        </>
    );
};

export default page;