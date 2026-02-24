"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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
          <span className="font-display text-3xl font-bold text-secondary">
            Olvad
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            className="text-secondary hover:text-primary-400 font-semibold transition-colors"
          >
            Home
          </a>
          <a
            href="/menu"
            className="text-secondary hover:text-primary-400 font-semibold transition-colors"
          >
            Menu
          </a>
          <a
            href="/profile/orders"
            className="text-secondary hover:text-primary-400 font-semibold transition-colors"
          >
            Pesanan
          </a>
          <a
            href="#about"
            className="text-secondary hover:text-primary-400 font-semibold transition-colors"
          >
            Tentang
          </a>
          <a
            href="#contact"
            className="text-secondary hover:text-primary-400 font-semibold transition-colors"
          >
            Kontak
          </a>
        </div>

        {/* Desktop: Login or User */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-secondary-50 transition-colors"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold shadow-md">
                  {getInitials(user.username)}
                </div>
                <span className="text-sm font-semibold text-secondary-700 max-w-30 truncate">
                  {user.username}
                </span>
                <svg
                  className={`w-4 h-4 text-secondary-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-secondary-100 py-2 animate-fade-in-up z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-secondary-100">
                    <p className="text-sm font-semibold text-secondary-800 truncate">
                      {user.username}
                    </p>
                    <p className="text-xs text-secondary-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  <a
                    href="/profile/orders"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary-600 hover:bg-secondary-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Pesanan Saya
                  </a>

                  <div className="border-t border-secondary-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="btn-hover px-6 py-2.5 bg-secondary text-white rounded-full font-semibold hover:bg-primary-500 shadow-md hover:shadow-lg transition-all"
            >
              Login
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-secondary"
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
                className="block text-secondary hover:text-primary-400 font-semibold py-2"
              >
                Home
              </a>
              <a
                href="/menu"
                className="block text-secondary hover:text-primary-400 font-semibold py-2"
              >
                Menu
              </a>
              <a
                href="/profile/orders"
                className="block text-secondary hover:text-primary-400 font-semibold py-2"
              >
                Pesanan
              </a>
              <a
                href="#about"
                className="block text-secondary hover:text-primary-400 font-semibold py-2"
              >
                Tentang
              </a>
              <a
                href="#contact"
                className="block text-secondary hover:text-primary-400 font-semibold py-2"
              >
                Kontak
              </a>

              {/* Mobile: Login or User */}
              {isLoggedIn && user ? (
                <div className="border-t border-secondary-100 pt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold shadow-md">
                      {getInitials(user.username)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary-800">
                        {user.username}
                      </p>
                      <p className="text-xs text-secondary-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-3 bg-red-50 text-red-500 rounded-full font-semibold hover:bg-red-100 transition-all text-center"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="block w-full btn-hover px-6 py-3 bg-primary-400 text-white rounded-full font-semibold hover:bg-primary-500 shadow-md transition-all text-center"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
