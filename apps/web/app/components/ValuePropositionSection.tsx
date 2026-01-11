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
    <section className="py-section-sm sm:py-section bg-gradient-to-br from-white via-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-tertiary-600 font-medium text-sm uppercase tracking-wide">
            Mengapa Olvad?
          </p>
          <h2 className="font-serif text-heading-2 text-primary-900">
            Keunggulan Kami
          </h2>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">
            Komitmen kami adalah memberikan yang terbaik untuk Anda
          </p>
        </div>

        {/* Value Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group animate-on-scroll p-8 bg-white rounded-2xl border border-primary-200 hover:border-tertiary-400 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {value.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-primary-900 mb-3">
                {value.title}
              </h3>
              <p className="text-primary-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-center text-white">
          <h3 className="font-serif text-2xl font-bold mb-4">
            Siap Merasakan Perbedaannya?
          </h3>
          <p className="mb-6 text-primary-100">
            Kunjungi Olvad hari ini dan nikmati pengalaman kopi & roti yang tak terlupakan
          </p>
          <button className="btn-hover px-8 py-4 bg-white text-primary-600 rounded-full font-bold hover:bg-primary-50 transition-colors inline-block">
            Datang Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
