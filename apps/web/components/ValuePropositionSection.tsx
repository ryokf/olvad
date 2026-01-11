"use client";

const values = [
  {
    icon: "🌱",
    title: "100% Arabica Gayo",
    description: "Biji kopi pilihan dari Gayo, Aceh dengan kualitas tertinggi",
  },
  {
    icon: "🕐",
    title: "Fresh Baked 6 AM",
    description: "Dipanggang setiap pagi untuk kesegaran maksimal",
  },
  {
    icon: "📶",
    title: "Cozy Space & WiFi",
    description: "Tempat nyaman untuk bekerja atau bersantai dengan internet cepat",
  },
  {
    icon: "❤️",
    title: "No Preservatives",
    description: "Tanpa bahan pengawet atau pewarna artifisial",
  },
  {
    icon: "🤝",
    title: "Fair Trade Certified",
    description: "Mendukung petani lokal dengan harga yang adil",
  },
  {
    icon: "⭐",
    title: "Award Winning",
    description: "Pemenang berbagai penghargaan kuliner nasional",
  },
];

export default function ValuePropositionSection() {
  return (
    <section className="py-20 sm:py-24 bg-linear-to-b from-amber-50 via-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#ABC4AA' }}>
            Mengapa Olvad?
          </p>
          <h2 className="text-5xl font-bold text-gray-900">
            Keunggulan Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Komitmen kami adalah memberikan yang terbaik untuk Anda
          </p>
        </div>

        {/* Value Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group animate-on-scroll p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent"
              style={{ animationDelay: `${index * 0.1}s`, borderColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ABC4AA'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">{value.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-linear-to-r from-amber-700 to-orange-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="font-display text-3xl font-bold mb-4">
            Siap Merasakan Perbedaannya?
          </h3>
          <p className="mb-6 text-amber-50 text-lg">
            Kunjungi Olvad hari ini dan nikmati pengalaman kopi & roti yang tak terlupakan
          </p>
          <button className="btn-hover px-8 py-4 bg-white text-amber-900 rounded-full font-bold hover:bg-amber-50 transition-colors inline-block shadow-lg hover:shadow-xl">
            Datang Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
