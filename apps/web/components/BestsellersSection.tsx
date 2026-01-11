"use client";

import { useState } from "react";
import Image from "next/image";

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
    image: "/images/product-latte.png",
    label: "Most Loved",
  },
  {
    id: 2,
    name: "Manual Brew Ethiopia",
    category: "Single Origin",
    price: 55000,
    image: "/images/product-manual-brew.png",
    label: "Chef's Recommendation",
  },
  {
    id: 3,
    name: "Butter Croissant",
    category: "Pastry",
    price: 35000,
    image: "/images/product-croissant.png",
    label: "Most Loved",
  },
  {
    id: 4,
    name: "Sourdough Toast",
    category: "Bread",
    price: 28000,
    image: "/images/product-sourdough.png",
    label: undefined,
  },
];

export default function BestsellersSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-24 bg-linear-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#ABC4AA' }}>
            Menu Unggulan
          </p>
          <h2 className="text-5xl font-bold text-gray-900">
            Menu Favorit Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Product Image Container */}
                <div className="relative h-64 bg-linear-to-br from-amber-50 to-orange-50 overflow-hidden">
                  {/* Label */}
                  {product.label && (
                    <div className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md" style={{ backgroundColor: '#ABC4AA' }}>
                      {product.label}
                    </div>
                  )}

                  {/* Product Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-amber-700 uppercase tracking-wide font-bold">
                      {product.category}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-2xl font-display font-bold text-amber-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <button
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all shadow-md ${hoveredId === product.id
                        ? "text-white scale-110 shadow-lg"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      style={hoveredId === product.id ? { backgroundColor: '#ABC4AA' } : {}}
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
          <button className="btn-hover px-10 py-4 bg-amber-700 text-white rounded-full font-semibold text-lg hover:bg-amber-800 shadow-lg hover:shadow-xl transition-all inline-block">
            Lihat Semua Menu
          </button>
        </div>
      </div>
    </section>
  );
}
