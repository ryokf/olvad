"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface MockOrderItem {
    name: string;
    quantity: number;
    variants: string[];
    price: number;
}

interface MockOrder {
    id: string;
    date: string;
    items: MockOrderItem[];
    total: number;
    status: 'completed' | 'preparing' | 'ready' | 'cancelled';
    orderType: string;
}

export default function OrderHistoryPage() {
    const router = useRouter();
    const { addItem } = useCart();
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

    // Mock order history data
    const mockOrders: MockOrder[] = [
        {
            id: 'ORD-1704934800000',
            date: '10 Jan 2026, 14:30',
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
            total: 104500,
            status: 'completed',
            orderType: 'Pick-up',
        },
        {
            id: 'ORD-1704848400000',
            date: '08 Jan 2026, 09:15',
            items: [
                {
                    name: 'Latte Premium',
                    quantity: 1,
                    variants: ['Hot', 'Regular', 'Oat Milk'],
                    price: 33000,
                },
                {
                    name: 'Chocolate Croissant',
                    quantity: 2,
                    variants: ['Heated'],
                    price: 56000,
                },
            ],
            total: 97900,
            status: 'completed',
            orderType: 'Dine-in',
        },
        {
            id: 'ORD-1704762000000',
            date: '05 Jan 2026, 16:45',
            items: [
                {
                    name: 'Matcha Latte',
                    quantity: 1,
                    variants: ['Ice', 'Large', 'Less Sugar'],
                    price: 35000,
                },
                {
                    name: 'Nasi Goreng Olvad',
                    quantity: 1,
                    variants: ['Pedas', 'Ayam'],
                    price: 35000,
                },
            ],
            total: 77000,
            status: 'completed',
            orderType: 'Delivery',
        },
    ];

    const filteredOrders = mockOrders.filter(
        (order) => filter === 'all' || order.status === filter
    );

    const getStatusBadge = (status: MockOrder['status']) => {
        const styles = {
            completed: 'bg-green-100 text-green-700 border-green-300',
            preparing: 'bg-amber-100 text-amber-700 border-amber-300',
            ready: 'bg-blue-100 text-blue-700 border-blue-300',
            cancelled: 'bg-red-100 text-red-700 border-red-300',
        };

        const labels = {
            completed: '✅ Selesai',
            preparing: '👨‍🍳 Sedang Disiapkan',
            ready: '🎉 Siap',
            cancelled: '❌ Dibatalkan',
        };

        return (
            <span
                className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${styles[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    const handleReorder = (order: MockOrder) => {
        // Mock: Add items back to cart
        // In real implementation, you'd use the actual product data
        alert(
            `Reorder functionality akan menambahkan ${order.items.length} item ke keranjang.\n\n` +
            `Items: ${order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}\n\n` +
            `(This is a mock - actual implementation would add to cart)`
        );
    };

    if (mockOrders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
                        <div className="text-8xl mb-6">📋</div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Belum Ada Riwayat Pesanan
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Mulai pesan kopi favoritmu sekarang!
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
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Riwayat Pesanan
                    </h1>
                    <p className="text-gray-600">
                        Lihat pesanan Anda sebelumnya dan pesan lagi dengan mudah
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-2xl p-2 shadow-md mb-6 flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${filter === 'all'
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Semua ({mockOrders.length})
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${filter === 'completed'
                                ? 'bg-green-100 text-green-900'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Selesai ({mockOrders.filter((o) => o.status === 'completed').length})
                    </button>
                    <button
                        onClick={() => setFilter('cancelled')}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${filter === 'cancelled'
                                ? 'bg-red-100 text-red-900'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Dibatalkan ({mockOrders.filter((o) => o.status === 'cancelled').length})
                    </button>
                </div>

                {/* Order List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Order Header */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Order ID</p>
                                        <p className="font-mono font-bold text-gray-900">
                                            {order.id}
                                        </p>
                                    </div>
                                    {getStatusBadge(order.status)}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Tanggal</p>
                                        <p className="font-semibold text-gray-900">
                                            {order.date}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Tipe</p>
                                        <p className="font-semibold text-gray-900">
                                            {order.orderType}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Items</p>
                                        <p className="font-semibold text-gray-900">
                                            {order.items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
                                            item
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Harga</p>
                                        <p className="font-bold text-amber-900 text-lg">
                                            Rp {order.total.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Items Preview */}
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                    <span className="font-semibold">Items:</span>
                                    <span>
                                        {order.items
                                            .map((item) => `${item.quantity}x ${item.name}`)
                                            .join(', ')}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            setExpandedOrder(
                                                expandedOrder === order.id ? null : order.id
                                            )
                                        }
                                        className="flex-1 py-3 px-6 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all"
                                    >
                                        {expandedOrder === order.id
                                            ? '▲ Sembunyikan Detail'
                                            : '▼ Lihat Detail'}
                                    </button>

                                    <button
                                        onClick={() => router.push(`/order/${order.id}`)}
                                        className="flex-1 py-3 px-6 rounded-full border-2 border-amber-500 text-amber-700 font-semibold hover:bg-amber-50 transition-all"
                                    >
                                        📍 Lacak Pesanan
                                    </button>

                                    {order.status === 'completed' && (
                                        <button
                                            onClick={() => handleReorder(order)}
                                            className="flex-1 py-3 px-6 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition-all hover:scale-105"
                                            style={{ backgroundColor: '#ABC4AA' }}
                                        >
                                            🔄 Pesan Lagi
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedOrder === order.id && (
                                <div className="bg-gray-50 p-6 border-t-2 border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-4">
                                        Detail Pesanan
                                    </h3>

                                    <div className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-2xl p-4 shadow-sm"
                                            >
                                                <div className="flex justify-between mb-2">
                                                    <span className="font-semibold text-gray-900">
                                                        {item.quantity}x {item.name}
                                                    </span>
                                                    <span className="font-bold text-gray-900">
                                                        Rp {item.price.toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.variants.map((variant, vIndex) => (
                                                        <span
                                                            key={vIndex}
                                                            className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold"
                                                        >
                                                            {variant}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t-2 border-gray-200">
                                        <div className="flex justify-between text-xl font-bold text-gray-900">
                                            <span>Total Pembayaran</span>
                                            <span>Rp {order.total.toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State for Filtered Results */}
                {filteredOrders.length === 0 && (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Tidak Ada Pesanan
                        </h3>
                        <p className="text-gray-600">
                            Tidak ditemukan pesanan dengan filter yang dipilih
                        </p>
                    </div>
                )}

                {/* Info Card */}
                <div className="mt-8 bg-amber-50 rounded-3xl p-6 border-2 border-amber-200">
                    <div className="flex gap-4">
                        <div className="text-3xl">💡</div>
                        <div>
                            <h4 className="font-bold text-amber-900 mb-2">
                                Fitur "Pesan Lagi"
                            </h4>
                            <p className="text-sm text-amber-900">
                                Dengan tombol "Pesan Lagi", semua item dari pesanan sebelumnya akan
                                langsung masuk ke keranjang Anda. Sangat praktis untuk repeat
                                order! ☕
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
