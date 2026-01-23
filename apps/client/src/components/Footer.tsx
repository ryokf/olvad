"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">☕</span>
              <h3 className="font-display text-2xl font-bold">Olvad</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Specialty Coffee & Artisan Bakery yang menghadirkan kualitas premium dengan kehangatan lokal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-amber-400">Menu</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Kopi Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Roti & Pastry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Paket Bundling
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Promo Spesial
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-amber-400">Perusahaan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-amber-400">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-amber-600 rounded-full transition-all hover:scale-110"
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-amber-600 rounded-full transition-all hover:scale-110"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-amber-600 rounded-full transition-all hover:scale-110"
              >
                <span className="text-lg">🐦</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-amber-600 rounded-full transition-all hover:scale-110"
              >
                <span className="text-lg">▶️</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Newsletter */}
          <div className="mb-8 pb-8 border-b border-gray-800">
            <h4 className="font-semibold text-lg mb-4 text-amber-400">Subscribe untuk Update</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-5 py-3 rounded-full bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600 border border-gray-800"
              />
              <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full transition-colors shadow-lg hover:shadow-xl whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2025 Olvad Coffee & Bakery. Hak cipta dilindungi.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
