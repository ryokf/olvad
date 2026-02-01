"use client";

import { useEffect, useState } from "react";

export default function LocationHoursSection() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Simple logic: check if current time is within opening hours
    const now = new Date();
    const hour = now.getHours();
    // Assuming open 6 AM to 8 PM
    setIsOpen(hour >= 6 && hour < 20);
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-linear-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#ABC4AA' }}>
            Lokasi & Jam
          </p>
          <h2 className="font-display text-5xl font-bold">
            Kunjungi Olvad Sekarang
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Kami menunggu Anda di lokasi kami yang nyaman
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Status */}
            <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-4 h-4 rounded-full animate-pulse shadow-lg"
                  style={{ backgroundColor: isOpen ? '#ABC4AA' : '#f87171' }}
                ></div>
                <p className="text-xl font-bold">
                  {isOpen ? "BUKA SEKARANG" : "TUTUP SEKARANG"}
                </p>
              </div>
              <p className="text-gray-300">
                {isOpen
                  ? "Silakan datang, kami siap melayani Anda!"
                  : "Buka kembali besok pukul 06:00"}
              </p>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Jam Operasional</h3>
              <div className="space-y-3 bg-white/5 rounded-xl p-6">
                {[
                  { day: "Senin - Jumat", hours: "06:00 - 20:00" },
                  { day: "Sabtu", hours: "07:00 - 21:00" },
                  { day: "Minggu", hours: "08:00 - 19:00" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <p className="text-gray-300">{item.day}</p>
                    <p className="font-semibold text-amber-400">{item.hours}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Alamat</h3>
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-sm mb-2 font-semibold" style={{ color: '#ABC4AA' }}>Lokasi Utama</p>
                <p className="text-gray-300 text-lg">
                  Jl. Merdeka No. 123<br />
                  Jakarta Selatan, 12345<br />
                  Indonesia
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Hubungi Kami</h3>
              <div className="flex flex-col gap-3 bg-white/5 rounded-xl p-6">
                <a
                  href="tel:+6281234567890"
                  className="text-gray-300 transition-colors flex items-center gap-3 text-lg"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ABC4AA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  <span className="text-2xl">📱</span> +62 812 3456 7890
                </a>
                <a
                  href="mailto:hello@olvad.co.id"
                  className="text-gray-300 transition-colors flex items-center gap-3 text-lg"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ABC4AA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  <span className="text-2xl">✉️</span> hello@olvad.co.id
                </a>
                <a
                  href="#"
                  className="text-gray-300 transition-colors flex items-center gap-3 text-lg"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ABC4AA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  <span className="text-2xl">📍</span> @olvadcoffee
                </a>
              </div>
            </div>

            {/* CTA */}
            <button
              className="btn-hover w-full px-8 py-4 text-white font-bold rounded-full transition-colors shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#ABC4AA' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#9ab399'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ABC4AA'}
            >
              Buka di Maps
            </button>
          </div>

          {/* Map Placeholder */}
          <div className="h-96 lg:h-full min-h-150 rounded-2xl overflow-hidden border border-white/20 bg-linear-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-6xl mb-4">🗺️</p>
                <p className="text-gray-300 font-semibold text-lg">Embedded Google Maps</p>
                <p className="text-gray-400 text-sm mt-2">
                  Replace dengan iframe Google Maps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
