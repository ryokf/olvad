"use client";

import { useState } from "react";
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="font-display text-2xl font-bold text-gray-900">
            Olvad
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-gray-700 hover:text-amber-700 font-semibold transition-colors"
          >
            Home
          </a>
          <a
            href="/menu"
            className="text-gray-700 hover:text-amber-700 font-semibold transition-colors"
          >
            Menu
          </a>
          <a
            href="/profile/orders"
            className="text-gray-700 hover:text-amber-700 font-semibold transition-colors"
          >
            Pesanan
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-amber-700 font-semibold transition-colors"
          >
            Tentang
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-amber-700 font-semibold transition-colors"
          >
            Kontak
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="btn-hover px-6 py-2.5 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 shadow-md hover:shadow-lg transition-all">
            Pesan Sekarang
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden shadow-lg">
            <div className="p-6 space-y-4">
              <a
                href="#home"
                className="block text-gray-700 hover:text-amber-700 font-semibold py-2"
              >
                Home
              </a>
              <a
                href="/menu"
                className="block text-gray-700 hover:text-amber-700 font-semibold py-2"
              >
                Menu
              </a>
              <a
                href="/profile/orders"
                className="block text-gray-700 hover:text-amber-700 font-semibold py-2"
              >
                Pesanan
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-amber-700 font-semibold py-2"
              >
                Tentang
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-amber-700 font-semibold py-2"
              >
                Kontak
              </a>
              <button className="w-full btn-hover px-6 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 shadow-md transition-all">
                Pesan Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
