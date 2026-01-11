"use client";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-tertiary-50 pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-tertiary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="font-serif text-heading-1 text-primary-900 leading-tight">
                Roti Hangat & Kopi Terbaik untuk Memulai Harimu
              </h1>
              <p className="text-lg text-primary-700 font-light leading-relaxed max-w-lg">
                Dibuat fresh setiap pagi dengan bahan premium tanpa pengawet. Rasakan kehangatan dalam setiap gigitan.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn-hover px-8 py-4 bg-primary-600 text-white rounded-full font-medium text-lg hover:bg-primary-700 transition-colors">
                Lihat Menu
              </button>
              <button className="btn-hover px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-medium text-lg hover:bg-primary-50 transition-colors">
                Pesan Sekarang
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-primary-200">
              <div>
                <p className="text-2xl font-serif font-bold text-primary-900">2.5K+</p>
                <p className="text-sm text-primary-600">Customer Puas</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-primary-900">4.8★</p>
                <p className="text-sm text-primary-600">Rating Google</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-primary-900">5Y+</p>
                <p className="text-sm text-primary-600">Dipercaya</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 sm:h-full min-h-96 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-3xl overflow-hidden">
              {/* Placeholder for hero image/video */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">☕</div>
                  <p className="text-primary-700 font-medium">Hero Visual</p>
                  <p className="text-primary-600 text-sm">Ganti dengan foto produk atau video latte art</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
