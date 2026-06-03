"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@olvad/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function BestsellersSection() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/product`);
        if (res.ok) {
          const data: Product[] = await res.json();
          // Show only available products, max 4
          setProducts(data.filter((p) => p.available).slice(0, 4));
        }
      } catch {
        // Silent fail - section just won't show products
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-linear-to-b from-white to-secondary-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-semibold text-sm uppercase tracking-wide text-primary">
            Menu Unggulan
          </p>
          <h2 className="text-5xl font-bold text-secondary">
            Menu Favorit Kami
          </h2>
          <p className="text-xl text-secondary-300 max-w-2xl mx-auto">
            Produk pilihan yang paling diminati oleh pelanggan setia kami
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
                <div className="h-64 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-8 bg-gray-100 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
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
                  <div className="relative h-64 bg-linear-to-br from-primary-50 to-primary-100 overflow-hidden flex items-center justify-center">
                    {/* Tags badge */}
                    {product.tags && (
                      <div className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md bg-primary">
                        {product.tags.split(",")[0].trim()}
                      </div>
                    )}

                    {/* Product Image */}
                    {product.photo ? (
                      <img
                        src={product.photo}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-6xl">☕</span>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-xs text-primary uppercase tracking-wide font-bold">
                        {product.category?.name || ""}
                      </p>
                      <h3 className="text-xl font-semibold text-secondary mt-2">
                        {product.name}
                      </h3>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <p className="text-2xl font-bold text-primary">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <button
                        onClick={() => router.push("/menu")}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all shadow-md ${hoveredId === product.id
                          ? "text-white scale-110 shadow-lg"
                          : "bg-primary-100 text-primary-500 hover:bg-primary-200"
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
        ) : null}

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push("/menu")}
            className="btn-hover px-10 py-4 bg-primary-400 text-white rounded-full font-semibold text-lg hover:bg-primary-500 shadow-lg hover:shadow-xl transition-all inline-block"
          >
            Lihat Semua Menu
          </button>
        </div>
      </div>
    </section>
  );
}
