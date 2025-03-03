import React from "react";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Recipes from "@/components/Recipes";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <Recipes />
        <Footer />
      </main>
    </>
  );
}
