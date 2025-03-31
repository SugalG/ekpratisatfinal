import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#f6f1ed] text-gray-950 py-10 border-t border-gray-300 relative mt-4">
      {/* Watermark Background - Fixed Position */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="relative w-full h-full">
          <img
            src="/FinalLogoGrayScale.png"
            alt="Ekpratisat Logo"
            className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-100 opacity-20 pointer-events-none"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="flex flex-col">
            {/* <a href="/" className="flex items-start mb-4">
              <img src="/FinalLogoGrayScale.png" alt="Ekpratisat Logo" className="w-32 h-auto" />
            </a> */}
            <h3 className="text-xl font-semibold mb-4">
              Welcome to Ekpratisat Real Estate – Smart Choices, Secure Investments!
            </h3>
            <p className="text-sm mb-4">
              At Ekpratisat Real Estate, we make property transactions simple, transparent, and hassle-free.
              As a trusted brokerage firm in Nepal, we act as the reliable bridge between buyers and sellers.
            </p>
            <p className="text-sm font-semibold mb-4">"एक प्रतिशत – उत्कृष्ट सेवा, उत्तम कारोबार।"</p>

            {/* Social Media */}
            <div className="flex gap-4">
              <a href="#" className="text-gray-700 hover:text-blue-500"><FaFacebookF className="text-xl" /></a>
              <a href="#" className="text-gray-700 hover:text-pink-500"><FaInstagram className="text-xl" /></a>
              <a href="#" className="text-gray-700 hover:text-black"><FaXTwitter className="text-xl" /></a>
              <a href="#" className="text-gray-700 hover:text-black"><FaTiktok className="text-xl" /></a>
              <a href="#" className="text-gray-700 hover:text-red-500"><FaYoutube className="text-xl" /></a>
              <a href="#" className="text-gray-700 hover:text-blue-700"><FaLinkedin className="text-xl" /></a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:text-gray-500">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500">Become an Agent</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500">Blogs</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500">FAQs</a></li>
              <li><a href="/contact" className="text-sm hover:text-gray-500">Contact Us</a></li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Browse Properties</h3>
            <ul className="space-y-2">
              <li><a href="/category/house" className="text-sm hover:text-gray-500">House</a></li>
              <li><a href="/category/land" className="text-sm hover:text-gray-500">Land</a></li>
              <li><a href="/category/flat" className="text-sm hover:text-gray-500">Flat</a></li>
              <li><a href="/category/apartment" className="text-sm hover:text-gray-500">Apartment</a></li>
              <li><a href="/category/business" className="text-sm hover:text-gray-500">Business</a></li>
              <li><a href="/category/hostel_boys" className="text-sm hover:text-gray-500">Boys Hostel</a></li>
              <li><a href="/category/hostel_girls" className="text-sm hover:text-gray-500">Girls Hostel</a></li>
              <li><a href="/category/room" className="text-sm hover:text-gray-500">Room</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 mb-4">
              <li><a href="#" className="text-sm hover:text-gray-500">Home Loans</a></li>
              <li><a href="/unit-converter" className="text-sm hover:text-gray-500">Unit Converter</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500">Terms and Conditions</a></li>
            </ul>

            <div className="flex flex-col space-y-2">
              <a href="#" className="inline-block">
                <img src="/google-play.png" alt="Google Play" className="h-10 w-auto" />
              </a>
              <a href="#" className="inline-block">
                <img src="/app-store.png" alt="App Store" className="h-10 w-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-300">
          <p className="text-xs text-center text-gray-500 mb-2">
            Disclaimer: EkPratisat.com is a real estate information platform that does not directly manage transactions.
          </p>
          <p className="text-xs text-center text-gray-700">
            © {new Date().getFullYear()} EkPratisat. All Rights Reserved. Developed by Ekpratisat Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;