"use client";

import { Canvas } from '@react-three/fiber';
import BakeryShop from './3D/BakeryShop';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background decoration */}
            {/* <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div> */}

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in-up min-h-[60vh] flex flex-col justify-center">
                        <div className="space-y-4">
                            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                Feel The Happiness In Every Bite
                            </h1>
                            <p className="text-xl text-gray-700 font-light leading-relaxed max-w-lg">
                                kombinasi dari bahan alami terbaik untuk manisnya setiap momen
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="btn-hover px-8 py-4 bg-amber-700 text-white rounded-full font-semibold text-lg hover:bg-amber-800 shadow-lg hover:shadow-xl transition-all">
                                Lihat Menu
                            </button>
                            <button className="btn-hover px-8 py-4 border-2 border-amber-700 text-amber-800 rounded-full font-semibold text-lg hover:bg-amber-50 shadow-md hover:shadow-lg transition-all">
                                Pesan Sekarang
                            </button>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative sm:h-full animate-fade-in">

                        {/* <Image
                                src="/images/hero-coffee.png"
                                alt="Premium Latte dengan Latte Art"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
                        <Canvas orthographic camera={{ zoom: 32, position: [0, 5, 6], near: 0 }}>
                            <ambientLight intensity={4} />
                            <directionalLight position={[10, 10, 5]} intensity={1} />
                            <BakeryShop />
                        </Canvas>

                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
