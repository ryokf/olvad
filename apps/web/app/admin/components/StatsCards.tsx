"use client";

interface Stats {
    total: number;
    unpaid: number;
    onProcess: number;
    done: number;
    revenue: number;
}

export default function StatsCards({ stats }: { stats: Stats }) {
    const cards = [
        {
            id: "stat-total",
            label: "Total Pesanan",
            value: stats.total,
            icon: "📋",
            color: "#6366f1",
            bg: "rgba(99,102,241,0.08)",
            border: "rgba(99,102,241,0.2)",
            format: "number",
        },
        {
            id: "stat-unpaid",
            label: "Belum Bayar",
            value: stats.unpaid,
            icon: "⏳",
            color: "#f59e0b",
            bg: "rgba(245,158,11,0.08)",
            border: "rgba(245,158,11,0.2)",
            format: "number",
        },
        {
            id: "stat-processing",
            label: "Diproses",
            value: stats.onProcess,
            icon: "🔥",
            color: "#ef4444",
            bg: "rgba(239,68,68,0.08)",
            border: "rgba(239,68,68,0.2)",
            format: "number",
        },
        {
            id: "stat-done",
            label: "Selesai",
            value: stats.done,
            icon: "✅",
            color: "#10b981",
            bg: "rgba(16,185,129,0.08)",
            border: "rgba(16,185,129,0.2)",
            format: "number",
        },
        {
            id: "stat-revenue",
            label: "Total Revenue",
            value: stats.revenue,
            icon: "💰",
            color: "#abc4aa",
            bg: "rgba(171,196,170,0.08)",
            border: "rgba(171,196,170,0.2)",
            format: "currency",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {cards.map((card) => (
                <div
                    key={card.id}
                    id={card.id}
                    className="rounded-2xl p-5 transition-all hover:scale-[1.02]"
                    style={{
                        background: "white",
                        border: `1px solid ${card.border}`,
                        boxShadow: `0 2px 12px ${card.bg}`,
                    }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                            style={{ background: card.bg }}
                        >
                            {card.icon}
                        </div>
                    </div>
                    <p
                        className="text-2xl font-bold leading-tight"
                        style={{ color: card.color }}
                    >
                        {card.format === "currency"
                            ? `Rp ${card.value.toLocaleString("id-ID")}`
                            : card.value}
                    </p>
                    <p className="text-xs font-medium mt-1" style={{ color: "#9ca3af" }}>
                        {card.label}
                    </p>
                </div>
            ))}
        </div>
    );
}
