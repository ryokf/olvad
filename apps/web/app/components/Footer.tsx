"use client";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Olvad</h3>
            <p className="text-primary-300 text-sm leading-relaxed">
              Specialty Coffee & Artisan Bakery yang menghadirkan kualitas premium dengan kehangatan lokal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Menu</h4>
            <ul className="space-y-2 text-primary-300">
              <li>
                <a href="#" className="hover:text-tertiary-400 transition-colors">
                  Kopi Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-tertiary-400 transition-colors">
                  Roti & Pastry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-tertiary-400 transition-colors">
                  Paket Bundling
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-tertiary-400 transition-colors">
                  Promo Spesial
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Perusahaan</h4>
            <ul className="space-y-2 text-primary-300">
              <li>
                <a href="#" className="hover:text-tertiary-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-tertiary-400 transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-tertiary-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-tertiary-400 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-primary-800 hover:bg-tertiary-500 rounded-full transition-colors"
              >
                f
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-primary-800 hover:bg-tertiary-500 rounded-full transition-colors"
              >
                📷
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-primary-800 hover:bg-tertiary-500 rounded-full transition-colors"
              >
                🐦
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-primary-800 hover:bg-tertiary-500 rounded-full transition-colors"
              >
                ▶️
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-800 pt-8">
          {/* Newsletter */}
          <div className="mb-8 pb-8 border-b border-primary-800">
            <h4 className="font-semibold text-lg mb-4">Subscribe untuk Update</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-full bg-primary-800 text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-tertiary-500"
              />
              <button className="px-6 py-3 bg-tertiary-500 hover:bg-tertiary-600 text-primary-900 font-bold rounded-full transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-primary-400">
            <p>&copy; 2025 Olvad Coffee & Bakery. Hak cipta dilindungi.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-tertiary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-tertiary-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-tertiary-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
