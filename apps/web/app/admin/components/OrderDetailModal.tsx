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
            className="fixed inset-0 z-50 flex items-center justify-end"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
        >
            <div
                className="h-full w-full max-w-lg overflow-y-auto"
                style={{
                    background: "white",
                    animation: "slideInRight 0.3s ease-out",
                    boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
                    style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                >
                    <div>
                        <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Detail Pesanan</p>
                        <h2 className="text-xl font-bold text-white">#{order.id}</h2>
                    </div>
                    <button
                        id="modal-close-btn"
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-70"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Status Update */}
                    <div className="rounded-2xl p-5 space-y-4" style={{ background: "#f8f9fb", border: "1px solid #e5e7eb" }}>
                        <h3 className="font-bold text-sm" style={{ color: "#374151" }}>⚡ Update Status</h3>

                        <div>
                            <label className="block text-xs font-medium mb-2" style={{ color: "#6b7280" }}>
                                Status Pembayaran
                            </label>
                            <div className="flex gap-2">
                                {["UNPAID", "PAID"].map((s) => (
                                    <button
                                        key={s}
                                        id={`payment-status-${s.toLowerCase()}`}
                                        onClick={() => setPaymentStatus(s)}
                                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                        style={{
                                            background: paymentStatus === s
                                                ? s === "PAID" ? "#10b981" : "#ef4444"
                                                : "white",
                                            color: paymentStatus === s ? "white" : "#9ca3af",
                                            border: paymentStatus === s ? "none" : "1px solid #e5e7eb",
                                        }}
                                    >
                                        {s === "PAID" ? "✅ Lunas" : "⏳ Belum Bayar"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-2" style={{ color: "#6b7280" }}>
                                Status Order
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { value: "ON_PROCESS", label: "👨‍🍳 Diproses", color: "#f59e0b" },
                                    { value: "DONE", label: "🎉 Selesai", color: "#10b981" },
                                    { value: "CANCELLED", label: "❌ Batal", color: "#ef4444" },
                                ].map((s) => (
                                    <button
                                        key={s.value}
                                        id={`order-status-${s.value.toLowerCase()}`}
                                        onClick={() => setOrderStatus(s.value as any)}
                                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                        style={{
                                            background: orderStatus === s.value ? s.color : "white",
                                            color: orderStatus === s.value ? "white" : "#9ca3af",
                                            border: orderStatus === s.value ? "none" : "1px solid #e5e7eb",
                                        }}
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
                            className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
                            style={{
                                background: hasChanges ? "linear-gradient(135deg, #abc4aa, #8fb597)" : "#e5e7eb",
                                color: hasChanges ? "white" : "#9ca3af",
                                cursor: hasChanges ? "pointer" : "not-allowed",
                            }}
                        >
                            {isSaving ? "Menyimpan..." : hasChanges ? "💾 Simpan Perubahan" : "Tidak ada perubahan"}
                        </button>
                    </div>

                    {/* Customer Info */}
                    <div className="rounded-2xl p-5" style={{ border: "1px solid #e5e7eb" }}>
                        <h3 className="font-bold text-sm mb-4" style={{ color: "#374151" }}>👤 Informasi Pelanggan</h3>
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
                    <div className="rounded-2xl p-5" style={{ border: "1px solid #e5e7eb" }}>
                        <h3 className="font-bold text-sm mb-4" style={{ color: "#374151" }}>💳 Pembayaran</h3>
                        <div className="space-y-3">
                            <InfoRow label="Metode" value={paymentMethodMap[order.paymentMethod] || order.paymentMethod} />
                            <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ background: "#f8f9fb" }}>
                                <span className="text-sm font-semibold" style={{ color: "#374151" }}>Total</span>
                                <span className="text-lg font-bold" style={{ color: "#abc4aa" }}>
                                    Rp {(order.totalPrice || 0).toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    {order.detailOrders && order.detailOrders.length > 0 && (
                        <div className="rounded-2xl p-5" style={{ border: "1px solid #e5e7eb" }}>
                            <h3 className="font-bold text-sm mb-4" style={{ color: "#374151" }}>🛍 Item Pesanan</h3>
                            <div className="space-y-3">
                                {order.detailOrders.map((item, idx) => (
                                    <div key={idx} className="flex items-start justify-between gap-3 py-3" style={{ borderBottom: idx < order.detailOrders!.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold" style={{ color: "#1a1a2e" }}>
                                                {item.qty}x {item.product?.name || `Produk #${item.productId}`}
                                            </p>
                                            {item.variants && item.variants.length > 0 && (
                                                <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                                                    {item.variants.map((v: any) => v.productVariantOption?.name).filter(Boolean).join(", ")}
                                                </p>
                                            )}
                                        </div>
                                        <p className="text-sm font-bold flex-shrink-0" style={{ color: "#374151" }}>
                                            Rp {(item.subtotalPrice || 0).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Danger Zone */}
                    <div className="rounded-2xl p-5" style={{ border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.02)" }}>
                        <h3 className="font-bold text-sm mb-3" style={{ color: "#ef4444" }}>⚠️ Zona Bahaya</h3>
                        <button
                            id="modal-delete-btn"
                            onClick={() => onDelete(order.id as number)}
                            className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
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
            <span className="text-xs" style={{ color: "#9ca3af" }}>{label}</span>
            <span className="text-sm font-medium text-right" style={{ color: "#374151" }}>{value}</span>
        </div>
    );
}
