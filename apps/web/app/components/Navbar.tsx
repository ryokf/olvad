"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-md border-b border-primary-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">☕</span>
          <span className="font-serif text-2xl font-bold text-primary-900">
            Olvad
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
          >
            Home
          </a>
          <a
            href="#menu"
            className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
          >
            Menu
          </a>
          <a
            href="#about"
            className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
          >
            Tentang
          </a>
          <a
            href="#contact"
            className="text-primary-700 hover:text-primary-900 font-medium transition-colors"
          >
            Kontak
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="btn-hover px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors">
            Pesan Sekarang
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-primary-900"
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
          <div className="absolute top-full left-0 right-0 bg-white border-b border-primary-200 md:hidden">
            <div className="p-6 space-y-4">
              <a
                href="#home"
                className="block text-primary-700 hover:text-primary-900 font-medium"
              >
                Home
              </a>
              <a
                href="#menu"
                className="block text-primary-700 hover:text-primary-900 font-medium"
              >
                Menu
              </a>
              <a
                href="#about"
                className="block text-primary-700 hover:text-primary-900 font-medium"
              >
                Tentang
              </a>
              <a
                href="#contact"
                className="block text-primary-700 hover:text-primary-900 font-medium"
              >
                Kontak
              </a>
              <button className="w-full btn-hover px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors">
                Pesan Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
