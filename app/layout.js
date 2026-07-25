/* eslint-disable react/prop-types */
import React from "react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata = {
  title: "Flavory | Discover Delicious Recipes",
  description: "Explore thousands of delicious recipes from around the world. Cook, share, and discover your next favorite meal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
