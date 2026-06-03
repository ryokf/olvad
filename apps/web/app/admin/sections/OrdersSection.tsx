"use client";

import { useState, useEffect, useCallback } from "react";
import { Order } from "@olvad/types";
import OrderTable from "../components/OrderTable";
import OrderDetailModal from "../components/OrderDetailModal";
import StatsCards from "../components/StatsCards";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const ADMIN_USER_ID = "1";
const ADMIN_ROLE = "admin";

export default function OrdersSection() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchOrders = useCallback(async (showRefresh = false) => {
        if (showRefresh) setIsRefreshing(true);
        else setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/order`, {
                headers: { "X-User-Id": ADMIN_USER_ID, "X-User-Role": ADMIN_ROLE },
            });
            if (!res.ok) throw new Error("Gagal memuat data pesanan");
            setOrders(await res.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    useEffect(() => {
        let result = [...orders];
        if (activeFilter !== "ALL") {
            if (["ON_PROCESS", "DONE", "CANCELLED"].includes(activeFilter))
                result = result.filter((o) => o.status === activeFilter);
            else if (["UNPAID", "PAID"].includes(activeFilter))
                result = result.filter((o) => o.paymentStatus === activeFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (o) =>
                    o.customerName?.toLowerCase().includes(q) ||
                    o.customerPhone?.toLowerCase().includes(q) ||
                    String(o.id).includes(q)
            );
        }
        setFilteredOrders(result);
    }, [orders, activeFilter, searchQuery]);

    const handleUpdateOrder = async (id: number, data: Partial<Order>) => {
        try {
            const res = await fetch(`${API_BASE_URL}/order/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Id": ADMIN_USER_ID,
                    "X-User-Role": ADMIN_ROLE,
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Gagal update pesanan");
            const updated: Order = await res.json();
            setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
            setSelectedOrder(updated);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error");
        }
    };

    const handleDeleteOrder = async (id: number) => {
        if (!confirm(`Hapus pesanan #${id}?`)) return;
        try {
            const res = await fetch(`${API_BASE_URL}/order/${id}`, {
                method: "DELETE",
                headers: { "X-User-Id": ADMIN_USER_ID, "X-User-Role": ADMIN_ROLE },
            });
            if (!res.ok) throw new Error("Gagal hapus pesanan");
            setOrders((prev) => prev.filter((o) => o.id !== id));
            setIsModalOpen(false);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error");
        }
    };

    const stats = {
        total: orders.length,
        unpaid: orders.filter((o) => o.paymentStatus === "UNPAID").length,
        onProcess: orders.filter((o) => o.status === "ON_PROCESS").length,
        done: orders.filter((o) => o.status === "DONE").length,
        revenue: orders
            .filter((o) => o.paymentStatus === "PAID")
            .reduce((s, o) => s + (o.totalPrice || 0), 0),
    };

    const filters = [
        { key: "ALL", label: "Semua" },
        { key: "UNPAID", label: "⏳ Belum Bayar" },
        { key: "PAID", label: "✅ Lunas" },
        { key: "ON_PROCESS", label: "👨‍🍳 Diproses" },
        { key: "DONE", label: "🎉 Selesai" },
    ];

    return (
        <div className="space-y-5">
            <StatsCards stats={stats} />

            {/* Filter + Search bar */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-2 flex-wrap">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            id={`filter-${f.key.toLowerCase()}`}
                            onClick={() => setActiveFilter(f.key)}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{
                                background: activeFilter === f.key ? "#1a1a2e" : "white",
                                color: activeFilter === f.key ? "#abc4aa" : "#6b7280",
                                border: activeFilter === f.key ? "1px solid rgba(171,196,170,0.3)" : "1px solid #e5e7eb",
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                        <input
                            id="orders-search"
                            type="text"
                            placeholder="Cari nama, HP, ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none w-52"
                            style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}
                        />
                    </div>
                    <button
                        id="orders-refresh"
                        onClick={() => fetchOrders(true)}
                        disabled={isRefreshing}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 flex items-center gap-2"
                        style={{ background: "#abc4aa" }}
                    >
                        <span className={isRefreshing ? "animate-spin inline-block" : ""}>🔄</span>
                        Refresh
                    </button>
                </div>
            </div>

            {/* Table */}
            {isLoading ? (
                <LoadingState label="Memuat pesanan..." />
            ) : error ? (
                <ErrorState message={error} onRetry={() => fetchOrders()} />
            ) : (
                <OrderTable
                    orders={filteredOrders}
                    onOpenDetail={(o) => { setSelectedOrder(o); setIsModalOpen(true); }}
                    onUpdateOrder={handleUpdateOrder}
                    onDeleteOrder={handleDeleteOrder}
                />
            )}

            {isModalOpen && selectedOrder && (
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdateOrder}
                    onDelete={handleDeleteOrder}
                />
            )}
        </div>
    );
}

export function LoadingState({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-green-400 animate-spin" />
            <p className="text-gray-500 font-medium text-sm">{label}</p>
        </div>
    );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-4xl">❌</span>
            <p className="text-red-500 font-medium text-sm">{message}</p>
            <button
                onClick={onRetry}
                className="px-6 py-2 rounded-xl text-white text-sm"
                style={{ background: "#abc4aa" }}
            >
                Coba Lagi
            </button>
        </div>
    );
}
