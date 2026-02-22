"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/services/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await login({ email, password });
            localStorage.setItem("token", result.accessToken);
            localStorage.setItem("user", JSON.stringify(result.user));
            window.location.href = "/";
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login gagal");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-secondary-600 via-secondary to-tertiary-400">
                {/* Decorative Blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-tertiary-300/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-primary-300/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-16 text-white">
                    <div className="mb-8">
                        <Image
                            src="/logo.png"
                            alt="Olvad Logo"
                            width={80}
                            height={80}
                            className="drop-shadow-2xl"
                        />
                    </div>
                    <h1 className="font-display text-5xl font-bold mb-4 text-center drop-shadow-lg">
                        Selamat Datang
                    </h1>
                    <p className="text-lg text-white/80 text-center max-w-md leading-relaxed">
                        Nikmati kemudahan memesan roti hangat & kopi terbaik langsung dari
                        genggaman tanganmu.
                    </p>

                    {/* Decorative lines */}
                    <div className="mt-12 flex items-center gap-3">
                        <span className="w-12 h-0.5 bg-white/30 rounded-full" />
                        <span className="w-3 h-3 border-2 border-white/40 rounded-full" />
                        <span className="w-12 h-0.5 bg-white/30 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
                        <Image src="/logo.png" alt="Olvad Logo" width={48} height={48} />
                        <span className="font-display text-3xl font-bold text-secondary">
                            Olvad
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-heading-3 text-secondary-800 mb-2">Masuk</h2>
                        <p className="text-secondary-400">
                            Masuk ke akunmu untuk melanjutkan
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-3 animate-fade-in-up">
                            <svg
                                className="w-5 h-5 shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-secondary-700 mb-2"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-300">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-secondary-200 bg-secondary-50/50 text-secondary-800 placeholder:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-secondary-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-300">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password"
                                    required
                                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-secondary-200 bg-secondary-50/50 text-secondary-800 placeholder:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-300 hover:text-secondary-500 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-secondary text-white rounded-xl font-semibold btn-hover hover:bg-secondary-700 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/20"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="w-5 h-5 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                    Memproses...
                                </>
                            ) : (
                                "Masuk"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <span className="flex-1 h-px bg-secondary-100" />
                        <span className="text-sm text-secondary-300">atau</span>
                        <span className="flex-1 h-px bg-secondary-100" />
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-secondary-400">
                        Belum punya akun?{" "}
                        <Link
                            href="/register"
                            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                        >
                            Daftar Sekarang
                        </Link>
                    </p>

                    {/* Back to home */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-sm text-secondary-300 hover:text-secondary-500 transition-colors"
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
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
