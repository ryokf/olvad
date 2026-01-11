"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

type OrderType = 'dine-in' | 'pickup' | 'delivery';
type PaymentMethod = 'qris' | 'transfer' | 'cashier';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCart();
    const [orderType, setOrderType] = useState<OrderType>('pickup');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');

    // Form states
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [tableNumber, setTableNumber] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');

    // Calculations
    const tax = Math.round(subtotal * 0.1); // PB1 10%
    const deliveryFee = orderType === 'delivery' ? 15000 : 0;
    const total = subtotal + tax + deliveryFee;

    const handlePlaceOrder = () => {
        // Mock order creation
        const orderId = `ORD-${Date.now()}`;

        // Clear cart and redirect to order tracking
        clearCart();
        router.push(`/order/${orderId}`);
    };

    const isFormValid = () => {
        if (!name || !phone) return false;
        if (orderType === 'dine-in' && !tableNumber) return false;
        if (orderType === 'pickup' && !pickupTime) return false;
        if (orderType === 'delivery' && !address) return false;
        return true;
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
                        <div className="text-8xl mb-6">🛒</div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Keranjang Kosong
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Silakan pilih menu terlebih dahulu untuk melakukan checkout
                        </p>
                        <button
                            onClick={() => router.push('/menu')}
                            className="px-8 py-4 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            style={{ backgroundColor: '#ABC4AA' }}
                        >
                            Lihat Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Checkout
                    </h1>
                    <p className="text-gray-600">
                        Lengkapi informasi pesanan Anda
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Type Selection */}
                        <div className="bg-white rounded-3xl p-6 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Tipe Pesanan
                            </h2>

                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <button
                                    onClick={() => setOrderType('dine-in')}
                                    className={`p-4 rounded-2xl border-2 transition-all ${orderType === 'dine-in'
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">🍽️</div>
                                    <div className="font-semibold text-gray-900">Dine-in</div>
                                    <div className="text-xs text-gray-600">Makan di tempat</div>
                                </button>

                                <button
                                    onClick={() => setOrderType('pickup')}
                                    className={`p-4 rounded-2xl border-2 transition-all ${orderType === 'pickup'
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">🚶</div>
                                    <div className="font-semibold text-gray-900">Pick-up</div>
                                    <div className="text-xs text-gray-600">Ambil sendiri</div>
                                </button>

                                <button
                                    onClick={() => setOrderType('delivery')}
                                    className={`p-4 rounded-2xl border-2 transition-all ${orderType === 'delivery'
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">🏍️</div>
                                    <div className="font-semibold text-gray-900">Delivery</div>
                                    <div className="text-xs text-gray-600">Antar ke lokasi</div>
                                </button>
                            </div>

                            {/* Conditional Inputs based on Order Type */}
                            {orderType === 'dine-in' && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nomor Meja <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={tableNumber}
                                        onChange={(e) => setTableNumber(e.target.value)}
                                        placeholder="Contoh: A12"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                                    />
                                </div>
                            )}

                            {orderType === 'pickup' && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Waktu Pengambilan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        value={pickupTime}
                                        onChange={(e) => setPickupTime(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                                    />
                                    <p className="text-sm text-gray-600 mt-2">
                                        💡 Pesanan akan disiapkan 15 menit sebelum waktu pengambilan
                                    </p>
                                </div>
                            )}

                            {orderType === 'delivery' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Alamat Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan"
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                                        />
                                    </div>
                                    <div className="bg-gray-100 rounded-2xl p-6 text-center">
                                        <div className="text-4xl mb-2">📍</div>
                                        <p className="text-sm text-gray-600">
                                            Pinpoint Lokasi (Map Placeholder)
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Customer Information */}
                        <div className="bg-white rounded-3xl p-6 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Informasi Pemesan
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nomor WhatsApp <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="08123456789"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                                    />
                                    <p className="text-sm text-gray-600 mt-2">
                                        📱 Anda akan menerima notifikasi status pesanan via WhatsApp
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Catatan untuk Dapur (Opsional)
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Contoh: Tolong jangan terlalu manis"
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-3xl p-6 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Metode Pembayaran
                            </h2>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setPaymentMethod('qris')}
                                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${paymentMethod === 'qris'
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl">💳</div>
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    QRIS / E-Wallet
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    GoPay, OVO, Dana, ShopeePay
                                                </div>
                                            </div>
                                        </div>
                                        {paymentMethod === 'qris' && (
                                            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('transfer')}
                                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${paymentMethod === 'transfer'
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl">🏦</div>
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    Transfer Manual
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    BCA, Mandiri, BNI
                                                </div>
                                            </div>
                                        </div>
                                        {paymentMethod === 'transfer' && (
                                            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>

                                {orderType === 'dine-in' && (
                                    <button
                                        onClick={() => setPaymentMethod('cashier')}
                                        className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${paymentMethod === 'cashier'
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="text-3xl">💰</div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">
                                                        Bayar di Kasir
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Cash / Debit di tempat
                                                    </div>
                                                </div>
                                            </div>
                                            {paymentMethod === 'cashier' && (
                                                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-md sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Ringkasan Pesanan
                            </h2>

                            {/* Items */}
                            <div className="space-y-3 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">
                                                {item.quantity}x {item.product.name}
                                            </div>
                                            {item.selectedVariants.map((variant) => (
                                                <div key={variant.variantId} className="text-xs text-gray-600">
                                                    {variant.selectedOptions.join(', ')}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                            Rp {item.totalPrice.toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t-2 border-gray-200 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Pajak (PB1 10%)</span>
                                    <span>Rp {tax.toLocaleString('id-ID')}</span>
                                </div>
                                {orderType === 'delivery' && (
                                    <div className="flex justify-between text-gray-700">
                                        <span>Ongkir</span>
                                        <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
                                    </div>
                                )}
                                <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>Rp {total.toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={!isFormValid()}
                                className={`w-full mt-6 py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg ${isFormValid()
                                        ? 'hover:scale-105 hover:shadow-xl'
                                        : 'opacity-50 cursor-not-allowed'
                                    }`}
                                style={
                                    isFormValid()
                                        ? { backgroundColor: '#ABC4AA' }
                                        : { backgroundColor: '#6B7280' }
                                }
                            >
                                Proses Pesanan
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-3">
                                *Pesanan akan diproses setelah pembayaran dikonfirmasi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
