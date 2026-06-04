"use client";

import { useState } from "react";
import { Order } from "@olvad/types";

interface OrderDetailModalProps {
    order: Order;
    onClose: () => void;
    onUpdate: (id: number, data: Partial<Order>) => void;
    onDelete: (id: number) => void;
}

const orderTypeMap: Record<string, string> = {
    DINE_IN: "🍽 Makan di Sini",
    PICK_UP: "🚶 Ambil Sendiri",
    DELIVERY: "🏍️ Delivery",
};

const paymentMethodMap: Record<string, string> = {
    QRIS: "QRIS / E-Wallet",
    TRANSFER: "Transfer Bank",
    CASHIER: "Bayar di Kasir",
};

export default function OrderDetailModal({
    order,
    onClose,
    onUpdate,
    onDelete,
}: OrderDetailModalProps) {
    const [orderStatus, setOrderStatus] = useState(order.status);
    const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus || "UNPAID");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await onUpdate(order.id as number, {
            status: orderStatus as any,
            paymentStatus: paymentStatus as any,
        });
        setIsSaving(false);
    };

    const hasChanges =
        orderStatus !== order.status || paymentStatus !== (order.paymentStatus || "UNPAID");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-[-8px_0_40px_rgba(0,0,0,0.12)]"
                style={{
                    animation: "slideInRight 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-secondary-800 to-secondary-900 border-b border-secondary-700/50"
                >
                    <div>
                        <p className="text-xs font-semibold text-secondary-300">Detail Pesanan</p>
                        <h2 className="text-xl font-bold text-white font-mono">#{order.id}</h2>
                    </div>
                    <button
                        id="modal-close-btn"
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all hover:bg-white/20 bg-white/10"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Status Update */}
                    <div className="rounded-2xl p-5 space-y-4 bg-secondary-50/50 border border-secondary-100/80">
                        <h3 className="font-bold text-sm text-secondary-800">⚡ Update Status</h3>

                        <div>
                            <label className="block text-xs font-bold mb-2 text-secondary-500">
                                Status Pembayaran
                            </label>
                            <div className="flex gap-2">
                                {["UNPAID", "PAID"].map((s) => (
                                    <button
                                        key={s}
                                        id={`payment-status-${s.toLowerCase()}`}
                                        onClick={() => setPaymentStatus(s as "UNPAID" | "PAID")}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                                            paymentStatus === s
                                                ? s === "PAID"
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-red-500 text-white border-red-500"
                                                : "bg-white text-secondary-400 border-secondary-200/60 hover:bg-secondary-50"
                                        }`}
                                    >
                                        {s === "PAID" ? "✅ Lunas" : "⏳ Belum Bayar"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold mb-2 text-secondary-500">
                                Status Order
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { value: "ON_PROCESS", label: "👨‍🍳 Diproses" },
                                    { value: "DONE", label: "🎉 Selesai" },
                                    { value: "CANCELLED", label: "❌ Batal" },
                                ].map((s) => (
                                    <button
                                        key={s.value}
                                        id={`order-status-${s.value.toLowerCase()}`}
                                        onClick={() => setOrderStatus(s.value as any)}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                                            orderStatus === s.value
                                                ? s.value === "ON_PROCESS"
                                                    ? "bg-amber-500 text-white border-amber-500"
                                                    : s.value === "DONE"
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-red-500 text-white border-red-500"
                                                : "bg-white text-secondary-400 border-secondary-200/60 hover:bg-secondary-50"
                                        }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            id="modal-save-btn"
                            onClick={handleSave}
                            disabled={!hasChanges || isSaving}
                            className={`w-full py-3 rounded-xl font-bold text-sm transition-all border ${
                                hasChanges
                                    ? "bg-gradient-to-br from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white border-transparent cursor-pointer shadow-md shadow-primary-500/10"
                                    : "bg-secondary-100 text-secondary-400 border-transparent cursor-not-allowed"
                            }`}
                        >
                            {isSaving ? "Menyimpan..." : hasChanges ? "💾 Simpan Perubahan" : "Tidak ada perubahan"}
                        </button>
                    </div>

                    {/* Customer Info */}
                    <div className="rounded-2xl p-5 border border-secondary-100/80">
                        <h3 className="font-bold text-sm mb-4 text-secondary-800">👤 Informasi Pelanggan</h3>
                        <div className="space-y-3">
                            <InfoRow label="Nama" value={order.customerName || "-"} />
                            <InfoRow label="No. HP" value={order.customerPhone || "-"} />
                            <InfoRow label="Tipe Order" value={orderTypeMap[order.type] || order.type} />
                            {order.tableNumber && <InfoRow label="No. Meja" value={order.tableNumber} />}
                            {order.pickupTime && <InfoRow label="Waktu Ambil" value={`${order.pickupTime} WIB`} />}
                            {order.deliveryAddress && <InfoRow label="Alamat" value={order.deliveryAddress} />}
                            {order.notes && <InfoRow label="Catatan" value={order.notes} />}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="rounded-2xl p-5 border border-secondary-100/80">
                        <h3 className="font-bold text-sm mb-4 text-secondary-800">💳 Pembayaran</h3>
                        <div className="space-y-3">
                            <InfoRow label="Metode" value={paymentMethodMap[order.paymentMethod] || order.paymentMethod} />
                            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-primary-50/50 border border-primary-100/30">
                                <span className="text-sm font-bold text-secondary-800">Total</span>
                                <span className="text-lg font-extrabold text-primary-700">
                                    Rp {(order.totalPrice || 0).toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    {order.detailOrders && order.detailOrders.length > 0 && (
                        <div className="rounded-2xl p-5 border border-secondary-100/80">
                            <h3 className="font-bold text-sm mb-4 text-secondary-800">🛍 Item Pesanan</h3>
                            <div className="space-y-3">
                                {order.detailOrders.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-start justify-between gap-3 py-3 ${
                                            idx < order.detailOrders!.length - 1 ? "border-b border-secondary-100/50" : ""
                                        }`}
                                    >
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-secondary-800">
                                                {item.qty}x {item.product?.name || `Produk #${item.productId}`}
                                            </p>
                                            {item.variants && item.variants.length > 0 && (
                                                <p className="text-xs mt-1 text-secondary-400">
                                                    {item.variants.map((v: any) => v.productVariantOption?.name).filter(Boolean).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                        <p className="text-sm font-bold flex-shrink-0 text-secondary-700">
                                            Rp {(item.subtotalPrice || 0).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Danger Zone */}
                    <div className="rounded-2xl p-5 border border-red-500/20 bg-red-500/[0.02]">
                        <h3 className="font-bold text-sm mb-3 text-red-500">⚠️ Zona Bahaya</h3>
                        <button
                            id="modal-delete-btn"
                            onClick={() => onDelete(order.id as number)}
                            className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 bg-red-500/10 text-red-500 border border-red-500/20"
                        >
                            🗑 Hapus Pesanan Ini
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-3">
            <span className="text-xs text-gray-400">{label}</span>
            <span className="text-sm font-medium text-right text-gray-700">{value}</span>
        </div>
    );
}
