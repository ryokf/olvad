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
    <section className="py-section-sm sm:py-section bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-tertiary-600 font-medium text-sm uppercase tracking-wide">
            Testimoni
          </p>
          <h2 className="font-serif text-heading-2 text-primary-900">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah bukti kualitas kami
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="animate-on-scroll group p-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-200 hover:border-tertiary-400 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-tertiary-500 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-primary-800 italic leading-relaxed mb-6 font-light">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="border-t border-primary-200 pt-4">
                <p className="font-serif font-bold text-primary-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-secondary-600">
                  {testimonial.source}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 p-12 bg-gradient-to-r from-primary-900 to-secondary-900 rounded-3xl text-white text-center">
          <div>
            <p className="font-serif text-heading-2 mb-2">4.8/5</p>
            <p className="text-primary-200">Rating Rata-rata</p>
          </div>
          <div>
            <p className="font-serif text-heading-2 mb-2">2,500+</p>
            <p className="text-primary-200">Review Positif</p>
          </div>
          <div>
            <p className="font-serif text-heading-2 mb-2">98%</p>
            <p className="text-primary-200">Rekomendasi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
