"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface OrderStatus {
    id: string;
    label: string;
    icon: string;
    completed: boolean;
    active: boolean;
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(2); // Mock: currently being prepared

    // Mock order data
    const mockOrder = {
        id: params.id,
        date: new Date().toLocaleString('id-ID', {
            dateStyle: 'long',
            timeStyle: 'short',
        }),
        items: [
            {
                name: 'Kopi Susu Gula Aren',
                quantity: 2,
                variants: ['Ice', 'Large', 'Extra Shot'],
                price: 70000,
            },
            {
                name: 'Butter Croissant',
                quantity: 1,
                variants: ['Heated'],
                price: 25000,
            },
        ],
        subtotal: 95000,
        tax: 9500,
        deliveryFee: 0,
        total: 104500,
        orderType: 'Pick-up',
        pickupTime: '09:00',
        estimatedTime: 15, // minutes
        customerName: 'John Doe',
        customerPhone: '08123456789',
    };

    const orderStatuses: OrderStatus[] = [
        {
            id: 'payment',
            label: 'Menunggu Pembayaran',
            icon: '💳',
            completed: currentStep > 0,
            active: currentStep === 0,
        },
        {
            id: 'received',
            label: 'Pesanan Diterima',
            icon: '✅',
            completed: currentStep > 1,
            active: currentStep === 1,
        },
        {
            id: 'preparing',
            label: 'Sedang Disiapkan',
            icon: '👨‍🍳',
            completed: currentStep > 2,
            active: currentStep === 2,
        },
        {
            id: 'ready',
            label: 'Siap Diambil',
            icon: '🎉',
            completed: currentStep > 3,
            active: currentStep === 3,
        },
        {
            id: 'completed',
            label: 'Selesai',
            icon: '🏆',
            completed: currentStep > 4,
            active: currentStep === 4,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4">☕</div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Pesanan Anda Sedang Diproses!
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Terima kasih telah memesan di Olvad Coffee & Bakery
                    </p>
                </div>

                {/* Order ID */}
                <div className="bg-white rounded-3xl p-6 shadow-md mb-6 text-center">
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="text-2xl font-bold text-gray-900 font-mono">
                        {mockOrder.id}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        {mockOrder.date}
                    </p>
                </div>

                {/* Status Stepper */}
                <div className="bg-white rounded-3xl p-8 shadow-md mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Status Pesanan
                    </h2>

                    {/* Desktop Stepper */}
                    <div className="hidden md:block">
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200">
                                <div
                                    className="h-full bg-amber-500 transition-all duration-500"
                                    style={{
                                        width: `${(currentStep / (orderStatuses.length - 1)) * 100}%`,
                                    }}
                                />
                            </div>

                            {/* Steps */}
                            <div className="relative flex justify-between">
                                {orderStatuses.map((status, index) => (
                                    <div
                                        key={status.id}
                                        className="flex flex-col items-center"
                                        style={{ width: `${100 / orderStatuses.length}%` }}
                                    >
                                        <div
                                            className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-4xl transition-all ${status.completed || status.active
                                                    ? 'bg-amber-100 border-amber-500'
                                                    : 'bg-white border-gray-300'
                                                } ${status.active
                                                    ? 'scale-110 shadow-lg animate-pulse'
                                                    : ''
                                                }`}
                                        >
                                            {status.icon}
                                        </div>
                                        <p
                                            className={`mt-4 text-center font-semibold text-sm ${status.completed || status.active
                                                    ? 'text-gray-900'
                                                    : 'text-gray-400'
                                                }`}
                                        >
                                            {status.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Stepper */}
                    <div className="md:hidden space-y-4">
                        {orderStatuses.map((status, index) => (
                            <div
                                key={status.id}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${status.active
                                        ? 'border-amber-500 bg-amber-50'
                                        : status.completed
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <div className="text-4xl">{status.icon}</div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        {status.label}
                                    </p>
                                </div>
                                {status.completed && (
                                    <svg
                                        className="w-6 h-6 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Estimated Time */}
                <div className="bg-linear-to-r from-amber-500 to-orange-500 rounded-3xl p-8 shadow-lg text-white mb-6 text-center">
                    <div className="text-5xl mb-3">⏱️</div>
                    <h3 className="text-2xl font-bold mb-2">
                        Estimasi Waktu
                    </h3>
                    <p className="text-4xl font-bold mb-2">
                        {mockOrder.estimatedTime} Menit
                    </p>
                    <p className="text-amber-100">
                        Pesananmu akan siap sekitar pukul {mockOrder.pickupTime}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Order Details */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Detail Pesanan
                        </h3>

                        <div className="space-y-4">
                            {mockOrder.items.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 pb-3">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-semibold text-gray-900">
                                            {item.quantity}x {item.name}
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            Rp {item.price.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {item.variants.join(', ')}
                                    </div>
                                </div>
                            ))}

                            <div className="pt-3 space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>Rp {mockOrder.subtotal.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Pajak (10%)</span>
                                    <span>Rp {mockOrder.tax.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t-2 border-gray-200">
                                    <span>Total</span>
                                    <span>Rp {mockOrder.total.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Informasi Pengambilan
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tipe Pesanan</p>
                                <p className="font-semibold text-gray-900 text-lg">
                                    🚶 {mockOrder.orderType}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Waktu Pengambilan</p>
                                <p className="font-semibold text-gray-900 text-lg">
                                    ⏰ {mockOrder.pickupTime} WIB
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Nama Pemesan</p>
                                <p className="font-semibold text-gray-900">
                                    {mockOrder.customerName}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1">Nomor WhatsApp</p>
                                <p className="font-semibold text-gray-900">
                                    {mockOrder.customerPhone}
                                </p>
                            </div>

                            <div className="bg-amber-50 rounded-2xl p-4 mt-4">
                                <p className="text-sm text-amber-900">
                                    📱 Anda akan menerima notifikasi via WhatsApp saat pesanan siap
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="py-4 px-6 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all"
                    >
                        Kembali ke Home
                    </button>
                    <button className="py-4 px-6 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        style={{ backgroundColor: '#ABC4AA' }}
                    >
                        Hubungi Kami
                    </button>
                </div>

                {/* Tips */}
                <div className="mt-8 bg-blue-50 rounded-3xl p-6 border-2 border-blue-200">
                    <div className="flex gap-4">
                        <div className="text-3xl">💡</div>
                        <div>
                            <h4 className="font-bold text-blue-900 mb-2">Tips:</h4>
                            <ul className="text-sm text-blue-900 space-y-1">
                                <li>• Tunjukkan halaman ini ke barista saat mengambil pesanan</li>
                                <li>• Simpan Order ID untuk referensi</li>
                                <li>• Jika ada kendala, hubungi kami via WhatsApp</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
