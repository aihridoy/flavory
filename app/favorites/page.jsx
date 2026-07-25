"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fetchUserFavorites, removeFavorite } from "@/app/action";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiHeart, FiTrash2, FiUser } from "react-icons/fi";

const FavoritesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.id) return;
      const result = await fetchUserFavorites(session.user.id);
      if (result.success) {
        setFavorites(result.data);
      }
      setLoading(false);
    };
    if (session?.user?.id) load();
  }, [session?.user?.id]);

  const handleRemove = async (favoriteId) => {
    const result = await removeFavorite(session.user.id, favoriteId);
    if (result.success) {
      setFavorites((prev) => prev.filter((f) => f._id !== favoriteId));
      toast.success("Removed from favorites");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen" style={{ background: 'var(--color-surface-muted)' }}>
        <section className="container">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <FiHeart size={18} style={{ color: 'var(--color-primary)' }} />
              <p className="text-sm font-medium uppercase tracking-wider"
                 style={{ color: 'var(--color-primary)' }}>
                Saved
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              My Favorite Recipes
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Every recipe you&apos;ve saved, all in one place
            </p>
          </div>

          {status === "loading" || loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden"
                     style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="h-48 skeleton" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 skeleton rounded w-3/4" />
                    <div className="h-4 skeleton rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                   style={{ background: 'var(--color-surface)' }}>
                <FiHeart size={32} style={{ color: 'var(--color-text-tertiary)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                No favorites yet
              </h3>
              <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                Save recipes you love and they&apos;ll show up here.
              </p>
              <Link href="/categorized" className="btn-primary">
                Browse Recipes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {favorites.map((fav) => (
                  <motion.div
                    key={fav._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card group block relative"
                  >
                    <button
                      onClick={() => handleRemove(fav._id)}
                      aria-label="Remove from favorites"
                      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 bg-white/95 backdrop-blur-sm"
                      style={{ color: 'var(--color-primary)', boxShadow: 'var(--shadow-sm)' }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                    <Link href={`/recipes/${fav.recipeId}`}>
                      <div className="relative w-full h-52 overflow-hidden">
                        <Image
                          src={fav.image}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt={fav.name}
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="font-semibold text-lg mb-3 line-clamp-2 transition-colors duration-200 group-hover:text-[var(--color-primary)]"
                            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                          {fav.name}
                        </h4>
                        <div className="flex items-center justify-between pt-3 border-t"
                             style={{ borderColor: 'var(--color-border-light)' }}>
                          <div className="flex items-center gap-1.5 text-xs"
                               style={{ color: 'var(--color-text-tertiary)' }}>
                            <FiUser size={12} />
                            <span>{fav.author}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold"
                               style={{ color: 'var(--color-primary)' }}>
                            <span>&#11088;</span>
                            <span>{fav.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default FavoritesPage;
