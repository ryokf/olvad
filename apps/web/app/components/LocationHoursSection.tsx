"use client";

import { useEffect, useState } from "react";

export default function LocationHoursSection() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Simple logic: check if current time is within opening hours
    // This is a placeholder - replace with actual logic for your cafe
    const now = new Date();
    const hour = now.getHours();
    // Assuming open 6 AM to 8 PM
    setIsOpen(hour >= 6 && hour < 20);
  }, []);

  return (
    <section className="py-section-sm sm:py-section bg-gradient-to-br from-primary-900 to-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-tertiary-300 font-medium text-sm uppercase tracking-wide">
            Lokasi & Jam
          </p>
          <h2 className="font-serif text-heading-2">
            Kunjungi Olvad Sekarang
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Kami menunggu Anda di lokasi kami yang nyaman
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Status */}
            <div className="p-6 bg-white bg-opacity-10 rounded-2xl border border-white border-opacity-20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    isOpen ? "bg-tertiary-400" : "bg-red-400"
                  } animate-pulse`}
                ></div>
                <p className="text-lg font-bold">
                  {isOpen ? "BUKA SEKARANG" : "TUTUP SEKARANG"}
                </p>
              </div>
              <p className="text-primary-200">
                {isOpen
                  ? "Silakan datang, kami siap melayani Anda!"
                  : "Buka kembali besok pukul 06:00"}
              </p>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold">Jam Operasional</h3>
              <div className="space-y-3">
                {[
                  { day: "Senin - Jumat", hours: "06:00 - 20:00" },
                  { day: "Sabtu", hours: "07:00 - 21:00" },
                  { day: "Minggu", hours: "08:00 - 19:00" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p className="text-primary-200">{item.day}</p>
                    <p className="font-semibold">{item.hours}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold">Alamat</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-tertiary-300 text-sm mb-2">Lokasi Utama</p>
                  <p className="text-primary-200">
                    Jl. Merdeka No. 123<br />
                    Jakarta Selatan, 12345<br />
                    Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold">Hubungi Kami</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+6281234567890"
                  className="text-tertiary-300 hover:text-tertiary-100 transition-colors flex items-center gap-2"
                >
                  <span>📱</span> +62 812 3456 7890
                </a>
                <a
                  href="mailto:hello@olvad.co.id"
                  className="text-tertiary-300 hover:text-tertiary-100 transition-colors flex items-center gap-2"
                >
                  <span>✉️</span> hello@olvad.co.id
                </a>
                <a
                  href="#"
                  className="text-tertiary-300 hover:text-tertiary-100 transition-colors flex items-center gap-2"
                >
                  <span>📍</span> @olvadcoffee
                </a>
              </div>
            </div>

            {/* CTA */}
            <button className="btn-hover w-full px-8 py-4 bg-tertiary-500 hover:bg-tertiary-600 text-primary-900 font-bold rounded-full transition-colors">
              Buka di Maps
            </button>
          </div>

          {/* Map Placeholder */}
          <div className="h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden border border-white border-opacity-20 backdrop-blur-sm bg-white bg-opacity-5">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl mb-4">🗺️</p>
                <p className="text-primary-200 font-medium">Embedded Google Maps</p>
                <p className="text-primary-300 text-sm mt-2">
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
