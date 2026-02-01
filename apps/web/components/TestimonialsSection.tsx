"use client";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  source: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Kopinya pas, nggak terlalu manis. Rotinya juara! Jadi langganan setiap hari saya.",
    author: "Budi Santoso",
    source: "Google Review",
    rating: 5,
  },
  {
    id: 2,
    text: "Tempat yang nyaman untuk bekerja. WiFi cepat, kopi enak, barista-nya ramah. Semua sempurna!",
    author: "Siti Nurhaliza",
    source: "Instagram",
    rating: 5,
  },
  {
    id: 3,
    text: "Akhirnya ketemu tempat yang jual roti enak dan sehat. Tidak ada rasa pengawet sama sekali.",
    author: "Ahmad Rahman",
    source: "Google Review",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 bg-linear-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#ABC4AA' }}>
            Testimoni
          </p>
          <h2 className="text-5xl font-bold text-gray-900">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah bukti kualitas kami
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="animate-on-scroll group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-amber-500 text-xl">
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 italic leading-relaxed mb-6 text-lg font-light">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900 text-lg">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {testimonial.source}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 p-12 bg-linear-to-r from-gray-900 to-gray-800 rounded-3xl text-white text-center shadow-2xl">
          <div>
            <p className="font-display text-5xl font-bold mb-2 text-amber-400">4.8/5</p>
            <p className="text-gray-300 text-lg">Rating Rata-rata</p>
          </div>
          <div>
            <p className="font-display text-5xl font-bold mb-2 text-amber-400">2,500+</p>
            <p className="text-gray-300 text-lg">Review Positif</p>
          </div>
          <div>
            <p className="font-display text-5xl font-bold mb-2 text-amber-400">98%</p>
            <p className="text-gray-300 text-lg">Rekomendasi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
