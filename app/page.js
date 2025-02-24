import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Recipes from "@/components/Recipes";
import Image from "next/image";

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
