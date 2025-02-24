import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">Learn with Sumit</h2>
            <p className="text-sm text-gray-500 mt-2">
              Discover amazing recipes & improve your cooking skills.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Home</a></li>
              <li><a href="#" className="hover:text-gray-900">Recipes</a></li>
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
            <div className="flex items-center space-x-4 mt-4 text-gray-600">
              <a href="#" className="hover:text-gray-900"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-gray-900"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-gray-900"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-gray-900"><FaYoutube size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Learn with Sumit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;