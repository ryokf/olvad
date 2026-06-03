"use client";

import { Order } from "@olvad/types";

interface OrderTableProps {
    orders: Order[];
    onOpenDetail: (order: Order) => void;
    onUpdateOrder: (id: number, data: Partial<Order>) => void;
    onDeleteOrder: (id: number) => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
    ON_PROCESS: { label: "Diproses", className: "bg-amber-500/10 text-amber-600" },
    DONE: { label: "Selesai", className: "bg-emerald-500/10 text-emerald-600" },
    CANCELLED: { label: "Dibatalkan", className: "bg-red-500/10 text-red-600" },
};

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
    UNPAID: { label: "Belum Bayar", className: "bg-red-500/10 text-red-600" },
    PAID: { label: "Lunas", className: "bg-emerald-500/10 text-emerald-600" },
};

const paymentMethodMap: Record<string, string> = {
    QRIS: "QRIS",
    TRANSFER: "Transfer",
    CASHIER: "Kasir",
};

const orderTypeMap: Record<string, string> = {
    DINE_IN: "🍽 Makan di Sini",
    PICK_UP: "🚶 Ambil Sendiri",
    DELIVERY: "🏍️ Delivery",
};

export default function OrderTable({
    orders,
    onOpenDetail,
    onUpdateOrder,
    onDeleteOrder,
}: OrderTableProps) {
    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-3 rounded-2xl bg-white border border-gray-200">
                <span className="text-5xl">📭</span>
                <p className="text-gray-500 font-medium">Tidak ada pesanan ditemukan</p>
            </div>
        );
    }

    const handleQuickPayment = (e: React.MouseEvent, order: Order) => {
        e.stopPropagation();
        const newStatus = order.paymentStatus === "UNPAID" ? "PAID" : "UNPAID";
        onUpdateOrder(order.id as number, { paymentStatus: newStatus });
    };

    const handleQuickStatus = (e: React.MouseEvent, order: Order) => {
        e.stopPropagation();
        const cycle: Record<string, string> = {
            ON_PROCESS: "DONE",
            DONE: "ON_PROCESS",
            CANCELLED: "ON_PROCESS",
        };
        const newStatus = cycle[order.status] || "ON_PROCESS";
        onUpdateOrder(order.id as number, { status: newStatus as any });
    };

    return (
        <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#f8f9fb] border-b border-gray-200">
                            {["ID", "Pelanggan", "Tipe", "Total", "Pembayaran", "Status Bayar", "Status Order", "Aksi"].map((h) => (
                                <th
                                    key={h}
                                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => {
                            const orderStatus = statusConfig[order.status] || statusConfig.ON_PROCESS;
                            const payStatus = paymentStatusConfig[order.paymentStatus || "UNPAID"] || paymentStatusConfig.UNPAID;
                            return (
                                <tr
                                    key={order.id}
                                    id={`order-row-${order.id}`}
                                    onClick={() => onOpenDetail(order)}
                                    className="cursor-pointer transition-colors border-b border-gray-100 bg-white hover:bg-[#f8f9fb]"
                                >
                                    {/* ID */}
                                    <td className="px-5 py-4">
                                        <span className="font-mono text-sm font-bold text-primary">
                                            #{order.id}
                                        </span>
                                    </td>

                                    {/* Customer */}
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-sm text-[#1a1a2e]">
                                            {order.customerName || "-"}
                                        </p>
                                        <p className="text-xs mt-0.5 text-gray-400">
                                            {order.customerPhone || "-"}
                                        </p>
                                    </td>

                                    {/* Type */}
                                    <td className="px-5 py-4">
                                        <span className="text-xs font-medium text-gray-500">
                                            {orderTypeMap[order.type] || order.type}
                                        </span>
                                    </td>

                                    {/* Total */}
                                    <td className="px-5 py-4">
                                        <span className="font-semibold text-sm text-[#1a1a2e]">
                                            Rp {(order.totalPrice || 0).toLocaleString("id-ID")}
                                        </span>
                                        <p className="text-xs mt-0.5 text-gray-400">
                                            {paymentMethodMap[order.paymentMethod] || order.paymentMethod}
                                        </p>
                                    </td>

                                    {/* Payment Method */}
                                    <td className="px-5 py-4">
                                        <span
                                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500"
                                        >
                                            {paymentMethodMap[order.paymentMethod] || order.paymentMethod}
                                        </span>
                                    </td>

                                    {/* Payment Status */}
                                    <td className="px-5 py-4">
                                        <button
                                            id={`pay-toggle-${order.id}`}
                                            onClick={(e) => handleQuickPayment(e, order)}
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all hover:opacity-80 ${payStatus.className}`}
                                            title="Klik untuk toggle status pembayaran"
                                        >
                                            {payStatus.label}
                                        </button>
                                    </td>

                                    {/* Order Status */}
                                    <td className="px-5 py-4">
                                        <button
                                            id={`status-toggle-${order.id}`}
                                            onClick={(e) => handleQuickStatus(e, order)}
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all hover:opacity-80 ${orderStatus.className}`}
                                            title="Klik untuk cycle status order"
                                        >
                                            {orderStatus.label}
                                        </button>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                id={`view-order-${order.id}`}
                                                onClick={(e) => { e.stopPropagation(); onOpenDetail(order); }}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all hover:opacity-80 bg-indigo-500/10 text-indigo-500"
                                                title="Lihat detail"
                                            >
                                                👁
                                            </button>
                                            <button
                                                id={`delete-order-${order.id}`}
                                                onClick={(e) => { e.stopPropagation(); onDeleteOrder(order.id as number); }}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all hover:opacity-80 bg-red-500/10 text-red-500"
                                                title="Hapus pesanan"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
