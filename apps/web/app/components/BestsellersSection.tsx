"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  label: "Most Loved" | "Chef's Recommendation" | undefined;
}

const products: Product[] = [
  {
    id: 1,
    name: "Latte Premium",
    category: "Specialty Coffee",
    price: 45000,
    image: "☕",
    label: "Most Loved",
  },
  {
    id: 2,
    name: "Manual Brew Ethiopia",
    category: "Single Origin",
    price: 55000,
    image: "☕",
    label: "Chef's Recommendation",
  },
  {
    id: 3,
    name: "Butter Croissant",
    category: "Pastry",
    price: 35000,
    image: "🥐",
    label: "Most Loved",
  },
  {
    id: 4,
    name: "Sourdough Toast",
    category: "Bread",
    price: 28000,
    image: "🍞",
    label: undefined,
  },
];

export default function BestsellersSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-section-sm sm:py-section bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-tertiary-600 font-medium text-sm uppercase tracking-wide">
            Menu Unggulan
          </p>
          <h2 className="font-serif text-heading-2 text-primary-900">
            Menu Favorit Kami
          </h2>
          <p className="text-lg text-primary-700 max-w-2xl mx-auto">
            Produk pilihan yang paling diminati oleh pelanggan setia kami
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="card-hover group animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl overflow-hidden border border-primary-200 hover:border-primary-400 transition-colors">
                {/* Product Image Container */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden">
                  {/* Label */}
                  {product.label && (
                    <div className="absolute top-3 right-3 bg-tertiary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.label}
                    </div>
                  )}

                  {/* Image Emoji */}
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-secondary-600 uppercase tracking-wide font-medium">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-serif text-primary-900 mt-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-primary-200">
                    <p className="text-lg font-serif font-bold text-primary-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <button
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                        hoveredId === product.id
                          ? "bg-tertiary-500 text-white scale-110"
                          : "bg-primary-100 text-primary-600 hover:bg-primary-200"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="btn-hover px-10 py-4 bg-primary-600 text-white rounded-full font-medium text-lg hover:bg-primary-700 transition-colors inline-block">
            Lihat Semua Menu
          </button>
        </div>
      </div>
    </section>
  );
}
