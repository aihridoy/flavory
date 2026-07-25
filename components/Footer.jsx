/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative" style={{ background: 'var(--color-text-primary)' }}>
      {/* Gradient Accent Line */}
      <div className="h-1" style={{ background: 'var(--gradient-primary)' }} />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: 'var(--gradient-primary)' }}>
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>F</span>
              </div>
              <span className="text-xl font-semibold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}>
                Flavory
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>
              Discover delicious recipes from around the world, crafted with love by home cooks and professional chefs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Recipes", path: "/categorized" },
                { name: "About Us", path: "/about-us" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-3">
              {["Breakfast", "Lunch", "Dinner", "Desserts"].map((category) => (
                <li key={category}>
                  <Link
                    href={`/recipes/category/${category.toLowerCase()}`}
                    className="text-sm transition-colors duration-200 hover:text-white"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
              Get weekly recipe inspiration delivered to your inbox.
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30"
              />
              <button
                className="px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 hover:opacity-90"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Join
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaYoutube, href: "#", label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-text-tertiary)' }}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
             style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
            &copy; {currentYear} Flavory. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm transition-colors duration-200 hover:text-white"
               style={{ color: 'var(--color-text-tertiary)' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-sm transition-colors duration-200 hover:text-white"
               style={{ color: 'var(--color-text-tertiary)' }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
