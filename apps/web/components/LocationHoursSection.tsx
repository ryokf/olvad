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
    <section className="py-20 sm:py-24 bg-white text-secondary">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-semibold text-sm uppercase tracking-wide text-[#7a9a78]">
            Lokasi & Jam
          </p>
          <h2 className="font-display text-5xl font-bold text-secondary">
            Kunjungi Olvad Sekarang
          </h2>
          <p className="text-xl text-secondary-300 max-w-2xl mx-auto">
            Kami menunggu Anda di lokasi kami yang nyaman
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Status */}
            {/* <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-4 h-4 rounded-full animate-pulse shadow-lg ${isOpen ? 'bg-[#7a9a78]' : 'bg-red-400'}`}
                ></div>
                <p className="text-xl font-bold text-secondary">
                  {isOpen ? "BUKA SEKARANG" : "TUTUP SEKARANG"}
                </p>
              </div>
              <p className="text-secondary-300">
                {isOpen
                  ? "Silakan datang, kami siap melayani Anda!"
                  : "Buka kembali besok pukul 06:00"}
              </p>
            </div> */}

            {/* Hours */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary">Jam Operasional</h3>
              <div className="space-y-3 bg-gray-50 rounded-xl p-6">
                {[
                  { day: "Senin - Jumat", hours: "06:00 - 20:00" },
                  { day: "Sabtu", hours: "07:00 - 21:00" },
                  { day: "Minggu", hours: "08:00 - 19:00" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                    <p className="text-secondary-300">{item.day}</p>
                    <p className="font-semibold text-[#7a9a78]">{item.hours}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary">Alamat</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-sm mb-2 font-semibold text-[#7a9a78]">Lokasi Utama</p>
                <p className="text-secondary-300 text-lg">
                  Jl. Merdeka No. 123<br />
                  Jakarta Selatan, 12345<br />
                  Indonesia
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary">Hubungi Kami</h3>
              <div className="flex flex-col gap-3 bg-gray-50 rounded-xl p-6">
                <a
                  href="tel:+6281234567890"
                  className="text-secondary-300 transition-colors flex items-center gap-3 text-lg hover:text-[#7a9a78]"
                >
                  <span className="text-2xl">📱</span> +62 812 3456 7890
                </a>
                <a
                  href="mailto:hello@olvad.co.id"
                  className="text-gray-600 transition-colors flex items-center gap-3 text-lg hover:text-[#7a9a78]"
                >
                  <span className="text-2xl">✉️</span> hello@olvad.co.id
                </a>
                <a
                  href="#"
                  className="text-gray-600 transition-colors flex items-center gap-3 text-lg hover:text-[#7a9a78]"
                >
                  <span className="text-2xl">📍</span> @olvadcoffee
                </a>
              </div>
            </div>

            {/* CTA */}
            <button
              className="btn-hover w-full px-8 py-4 text-white font-bold rounded-full transition-colors shadow-lg hover:shadow-xl bg-[#7a9a78] hover:bg-[#6b8b69]"
            >
              Buka di Maps
            </button>
          </div>

          {/* Map Placeholder */}
          <div className="h-96 lg:h-full min-h-150 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-6xl mb-4">🗺️</p>
                <p className="text-secondary-300 font-semibold text-lg">Embedded Google Maps</p>
                <p className="text-secondary-300 text-sm mt-2">
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
