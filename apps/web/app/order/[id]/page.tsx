"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOrder } from '@/services/order';
import { Order } from '@olvad/types';

interface OrderStatus {
    id: string;
    label: string;
    icon: string;
    completed: boolean;
    active: boolean;
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Fetch order data on mount
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderId = parseInt(params.id);
                const fetchedOrder = await getOrder(orderId);
                setOrder(fetchedOrder);

                // Determine current step based on payment and order status
                if (fetchedOrder.paymentStatus === 'UNPAID') {
                    setCurrentStep(0); // Waiting for payment
                } else if (fetchedOrder.paymentStatus === 'AWAITING_VERIFICATION') {
                    setCurrentStep(1); // Awaiting verification
                } else if (fetchedOrder.status === 'ON_PROCESS') {
                    setCurrentStep(2); // Being prepared
                } else if (fetchedOrder.status === 'DONE') {
                    setCurrentStep(3); // Ready
                } else {
                    setCurrentStep(1); // Order received
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load order';
                setError(errorMessage);
                console.error('Order fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [params.id]);

    // Handle file selection with preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setUploadFile(file);
        setUploadError(null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setUploadPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setUploadPreview(null);
        }
    };

    // Handle payment proof upload
    const handleUpload = async () => {
        if (!file || !order) return;
        setIsUploading(true);
        setUploadError(null);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/order/${order.id}/upload-proof`,
                { method: 'PATCH', body: formData },
            );
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Gagal mengunggah bukti');
            }
            window.location.reload();
        } catch (err) {
            setUploadError(err instanceof Error ? err.message : 'Gagal mengunggah bukti');
        } finally {
            setIsUploading(false);
        }
    };

    // Shorthand for file state
    const file = uploadFile;

    // Get order type display
    const getOrderTypeDisplay = (type: string): string => {
        const typeMap: Record<string, string> = {
            'DINE_IN': 'Makan di Tempat',
            'PICK_UP': 'Ambil Sendiri',
            'DELIVERY': 'Diantar',
        };
        return typeMap[type] || type;
    };

    // Get order type icon
    const getOrderTypeIcon = (type: string): string => {
        const iconMap: Record<string, string> = {
            'DINE_IN': '🍽️',
            'PICK_UP': '🚶',
            'DELIVERY': '🏍️',
        };
        return iconMap[type] || '📦';
    };

    // Get payment method display
    const getPaymentMethodDisplay = (method: string): string => {
        const methodMap: Record<string, string> = {
            'QRIS': 'QRIS / E-Wallet',
            'TRANSFER': 'Transfer Manual',
            'CASHIER': 'Bayar di Kasir',
        };
        return methodMap[method] || method;
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-xl font-semibold text-gray-900">Memuat pesanan Anda...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
                <div className="bg-white rounded-3xl p-12 text-center shadow-lg max-w-md">
                    <div className="text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Terjadi Kesalahan</h1>
                    <p className="text-gray-600 mb-6">{error || 'Pesanan tidak ditemukan'}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-8 py-3 rounded-full font-bold text-white bg-primary"
                    >
                        Kembali ke Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="text-6xl mb-4">☕</div>
                    <h1 className="text-4xl font-bold text-secondary mb-2">
                        Pesanan Anda{order.paymentStatus === 'UNPAID' ? ' Menunggu Pembayaran!' : ' Sedang Diproses!'}
                    </h1>
                    <p className="text-secondary-300 text-lg">
                        Terima kasih telah memesan di Olvad Coffee & Bakery
                    </p>
                </div>

                {/* Order ID */}
                <div className="bg-white rounded-3xl p-6 shadow-md mb-6 text-center">
                    <p className="text-sm text-secondary-300 mb-1">Order ID</p>
                    <p className="text-2xl font-bold text-secondary font-mono">
                        #{order.id}
                    </p>
                    <p className="text-sm text-secondary-300 mt-2">
                        {new Date().toLocaleString('id-ID', {
                            dateStyle: 'long',
                            timeStyle: 'short',
                        })}
                    </p>
                </div>

                {/* Payment Status Alert */}
                {order.paymentStatus === 'UNPAID' && (
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 mb-6">
                        <p className="text-center text-amber-900 font-semibold text-lg">
                            ⚠️ Pesanan Anda belum dibayar
                        </p>
                    </div>
                )}

                {/* AWAITING VERIFICATION Banner */}
                {order.paymentStatus === 'AWAITING_VERIFICATION' && (
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-3xl p-6 mb-6 flex items-center gap-4">
                        <div className="text-4xl animate-spin" style={{ animationDuration: '3s' }}>⏳</div>
                        <div>
                            <p className="font-bold text-blue-900 text-lg">Bukti sedang diverifikasi</p>
                            <p className="text-blue-700 text-sm mt-1">
                                Admin kami sedang mengecek bukti transfer Anda. Mohon tunggu sebentar — biasanya kurang dari 5 menit.
                            </p>
                        </div>
                    </div>
                )}

                {/* Payment Information Section */}
                {order.paymentStatus === 'UNPAID' && (
                    <div className="bg-white rounded-3xl p-8 shadow-md mb-6">
                        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
                            Konfirmasi Pembayaran
                        </h2>

                        {order.paymentMethod === 'QRIS' && (
                            <div className="space-y-4">
                                <div className="bg-gray-100 rounded-2xl p-8 flex justify-center">
                                    {/* QRIS Barcode Placeholder */}
                                    <div className="text-center">
                                        <div className="text-6xl mb-3">📱</div>
                                        <div className="bg-gray-300 rounded-xl w-48 h-48 flex items-center justify-center border-4 border-gray-400">
                                            <p className="text-gray-600 text-sm text-center px-4">
                                                QRIS Code akan ditampilkan di sini
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                                    <h3 className="font-bold text-blue-900 mb-2">📲 Instruksi Pembayaran:</h3>
                                    <ol className="text-sm text-blue-900 space-y-2 ml-4 list-decimal">
                                        <li>Buka aplikasi e-wallet Anda (GoPay, OVO, Dana, ShopeePay, dll)</li>
                                        <li>Pindai barcode QRIS di atas</li>
                                        <li>Konfirmasi jumlah Rp {order.totalPrice.toLocaleString('id-ID')}</li>
                                        <li>Pembayaran akan langsung diproses</li>
                                        <li>Pesanan Anda akan segera dibuat setelah pembayaran dikonfirmasi</li>
                                    </ol>
                                </div>

                                <div className="text-center p-4 bg-gray-100 rounded-2xl">
                                    <p className="font-semibold text-gray-900">Total Pembayaran:</p>
                                    <p className="text-3xl font-bold text-secondary">
                                        Rp {order.totalPrice.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {order.paymentMethod === 'TRANSFER' && (
                            <div className="space-y-4">
                                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                                    <h3 className="font-bold text-blue-900 mb-3">🏦 Pilih Bank untuk Transfer:</h3>

                                    <div className="space-y-3">
                                        <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                                            <p className="font-semibold text-gray-900">BCA</p>
                                            <p className="text-lg text-gray-700 font-mono mt-1">1234567890</p>
                                            <p className="text-sm text-gray-600 mt-1">a.n. Olvad Coffee &amp; Bakery</p>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                                            <p className="font-semibold text-gray-900">Mandiri</p>
                                            <p className="text-lg text-gray-700 font-mono mt-1">1234567890</p>
                                            <p className="text-sm text-gray-600 mt-1">a.n. Olvad Coffee &amp; Bakery</p>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                                            <p className="font-semibold text-gray-900">BNI</p>
                                            <p className="text-lg text-gray-700 font-mono mt-1">1234567890</p>
                                            <p className="text-sm text-gray-600 mt-1">a.n. Olvad Coffee &amp; Bakery</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
                                    <h3 className="font-bold text-amber-900 mb-2">⏰ Instruksi Penting:</h3>
                                    <ol className="text-sm text-amber-900 space-y-2 ml-4 list-decimal">
                                        <li>Transfer ke nomor rekening di atas sebesar <strong>Rp {order.totalPrice.toLocaleString('id-ID')}</strong></li>
                                        <li>Gunakan Order ID <strong>#{order.id}</strong> sebagai catatan transfer</li>
                                        <li>Unggah bukti transfer di bawah ini — admin akan memverifikasi dalam 5 menit</li>
                                    </ol>
                                </div>

                                {/* Upload Proof Form */}
                                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-4">📤 Unggah Bukti Transfer</h3>

                                    {/* Preview */}
                                    {uploadPreview && (
                                        <div className="mb-4 rounded-xl overflow-hidden border-2 border-gray-200">
                                            <img
                                                src={uploadPreview}
                                                alt="Preview bukti transfer"
                                                className="w-full max-h-56 object-contain bg-gray-50"
                                            />
                                        </div>
                                    )}

                                    <label
                                        htmlFor="proof-upload"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">{uploadPreview ? '🔄' : '📷'}</div>
                                            <p className="text-sm text-gray-600 font-semibold">
                                                {uploadPreview ? 'Ganti foto' : 'Klik untuk memilih foto'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — maks. 5MB</p>
                                        </div>
                                        <input
                                            id="proof-upload"
                                            type="file"
                                            accept="image/jpg,image/jpeg,image/png,image/webp"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>

                                    {uploadError && (
                                        <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-xl p-3">
                                            ❌ {uploadError}
                                        </p>
                                    )}

                                    <button
                                        id="upload-proof-btn"
                                        onClick={handleUpload}
                                        disabled={!file || isUploading}
                                        className="mt-4 w-full py-3 rounded-full font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-primary hover:shadow-lg hover:scale-[1.02] active:scale-100"
                                    >
                                        {isUploading ? '⏳ Mengunggah...' : '✅ Kirim Bukti Pembayaran'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {order.paymentMethod === 'CASHIER' && (
                            <div className="space-y-4">
                                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                                    <h3 className="font-bold text-green-900 mb-2">💰 Informasi Pembayaran:</h3>
                                    <p className="text-sm text-green-900 mb-3">
                                        Anda memilih untuk membayar langsung di kasir saat pengambilan pesanan.
                                    </p>
                                    <div className="text-center p-4 bg-white rounded-xl">
                                        <p className="font-semibold text-gray-900">Total Pembayaran:</p>
                                        <p className="text-3xl font-bold text-secondary">
                                            Rp {order.totalPrice.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                                    <h3 className="font-bold text-blue-900 mb-2">📝 Instruksi:</h3>
                                    <ol className="text-sm text-blue-900 space-y-2 ml-4 list-decimal">
                                        <li>Pesanan Anda akan dibuat segera setelah dikonfirmasi</li>
                                        <li>Silakan ambil pesanan sesuai jadwal yang disepakati</li>
                                        <li>Bayarkan di kasir saat pengambilan pesanan</li>
                                        <li>Tunjukkan halaman ini atau Order ID <strong>#{order.id}</strong> ke barista</li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Status Stepper */}
                <div className="bg-white rounded-3xl p-8 shadow-md mb-6">
                    <h2 className="text-2xl font-bold text-secondary mb-8 text-center">
                        Status Pesanan
                    </h2>

                    {/* Desktop Stepper */}
                    <div className="hidden md:block">
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200">
                                <div
                                    className="h-full bg-primary-400 transition-all duration-500"
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
                                                ? 'bg-primary-100 border-primary-400'
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
                                                ? 'text-secondary'
                                                : 'text-secondary-300'
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
                                    ? 'border-primary-400 bg-primary-50'
                                    : status.completed
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <div className="text-4xl">{status.icon}</div>
                                <div className="flex-1">
                                    <p className="font-semibold text-secondary">
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

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Order Details */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-xl font-bold text-secondary mb-4">
                            Detail Pesanan
                        </h3>

                        <div className="space-y-4">
                            {order.detailOrders?.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 pb-3">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-semibold text-secondary">
                                            {item.qty}x {item.product?.name}
                                        </span>
                                        <span className="font-semibold text-secondary">
                                            Rp {item.subtotalPrice.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    {item.variants && item.variants.length > 0 && (
                                        <div className="text-sm text-secondary-300">
                                            {item.variants.map((v, i) => (
                                                <div key={i}>{v.productVariantOption?.name}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="pt-3 space-y-2">
                                <div className="flex justify-between text-secondary-400">
                                    <span>Subtotal</span>
                                    <span>Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-secondary pt-2 border-t-2 border-gray-200">
                                    <span>Total</span>
                                    <span>Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-xl font-bold text-secondary mb-4">
                            Informasi Pesanan
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-secondary-300 mb-1">Tipe Pesanan</p>
                                <p className="font-semibold text-secondary text-lg">
                                    {getOrderTypeIcon(order.type)} {getOrderTypeDisplay(order.type)}
                                </p>
                            </div>

                            {order.type === 'PICK_UP' && order.pickupTime && (
                                <div>
                                    <p className="text-sm text-secondary-300 mb-1">Waktu Pengambilan</p>
                                    <p className="font-semibold text-secondary text-lg">
                                        ⏰ {order.pickupTime} WIB
                                    </p>
                                </div>
                            )}

                            {order.type === 'DINE_IN' && order.tableNumber && (
                                <div>
                                    <p className="text-sm text-secondary-300 mb-1">Nomor Meja</p>
                                    <p className="font-semibold text-secondary text-lg">
                                        🍽️ {order.tableNumber}
                                    </p>
                                </div>
                            )}

                            {order.type === 'DELIVERY' && order.deliveryAddress && (
                                <div>
                                    <p className="text-sm text-secondary-300 mb-1">Alamat Pengiriman</p>
                                    <p className="font-semibold text-secondary">
                                        📍 {order.deliveryAddress}
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className="text-sm text-secondary-300 mb-1">Nama Pemesan</p>
                                <p className="font-semibold text-secondary">
                                    {order.customerName}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-secondary-300 mb-1">Nomor WhatsApp</p>
                                <p className="font-semibold text-secondary">
                                    {order.customerPhone}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-secondary-300 mb-1">Metode Pembayaran</p>
                                <p className="font-semibold text-secondary">
                                    {getPaymentMethodDisplay(order.paymentMethod)}
                                </p>
                            </div>

                            {order.notes && (
                                <div>
                                    <p className="text-sm text-secondary-300 mb-1">Catatan</p>
                                    <p className="font-semibold text-secondary text-sm">
                                        {order.notes}
                                    </p>
                                </div>
                            )}

                            <div className="bg-primary-50 rounded-2xl p-4 mt-4">
                                <p className="text-sm text-primary-800">
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
                        className="py-4 px-6 rounded-full border-2 border-gray-300 text-secondary font-semibold hover:border-gray-400 transition-all"
                    >
                        Kembali ke Home
                    </button>
                    <button className="py-4 px-6 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-primary">
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
                                <li>• {order.paymentStatus === 'UNPAID' ? 'Segera lakukan pembayaran agar pesanan diproses' : 'Tunjukkan halaman ini ke barista saat mengambil pesanan'}</li>
                                <li>• Simpan Order ID <strong>#{order.id}</strong> untuk referensi</li>
                                <li>• Jika ada kendala, hubungi kami via WhatsApp</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

