import React from 'react';

const Recipes = () => {
    return (
        <section className="container py-8">
            <div className="grid grid-cols-12 py-4">
                <div className="col-span-12 md:col-span-3">
                    <h3 className="font-bold text-xl">Recipes</h3>
                    <ul className="pl-2 my-6 space-y-4 text-gray-500 text-sm">
                        <li><a href="#">Morning Bliss Café</a></li>
                        <li><a href="#">Sunrise Bites Kitchen</a></li>
                        <li><a href="#">Brunch Haven Delights</a></li>
                        <li><a href="#">Rise & Dine Eatery</a></li>
                        <li><a href="#">Breakfast Oasis Junction</a></li>
                    </ul>
                </div>

                <div className="col-span-12 md:col-span-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                        {[
                            "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
                            "https://images.unsplash.com/photo-1525351484163-7529414344d8",
                            "https://images.unsplash.com/photo-1529042410759-befb1204b468",
                            "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
                            "https://images.unsplash.com/photo-1551024709-8f23befc6f87"
                        ].map((imgSrc, index) => (
                            <div key={index} className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                                <div className="w-full h-48 overflow-hidden rounded-md">
                                    <img src={imgSrc} className="w-full h-full object-cover" alt="" />
                                </div>
                                <h4 className="my-2 font-semibold text-gray-800">Chef John's Turkey Sloppy Joes</h4>
                                <div className="py-2 flex justify-between text-xs text-gray-500">
                                    <span>⭐️ 5.0</span>
                                    <span>By: John Doe</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recipes;