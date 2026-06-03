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
            iconBg: "bg-indigo-500/10",
            textClass: "text-indigo-600",
            borderClass: "border-indigo-500/20",
            shadowClass: "shadow-indigo-500/5",
            format: "number",
        },
        {
            id: "stat-unpaid",
            label: "Belum Bayar",
            value: stats.unpaid,
            icon: "⏳",
            iconBg: "bg-amber-500/10",
            textClass: "text-amber-600",
            borderClass: "border-amber-500/20",
            shadowClass: "shadow-amber-500/5",
            format: "number",
        },
        {
            id: "stat-processing",
            label: "Diproses",
            value: stats.onProcess,
            icon: "🔥",
            iconBg: "bg-red-500/10",
            textClass: "text-red-600",
            borderClass: "border-red-500/20",
            shadowClass: "shadow-red-500/5",
            format: "number",
        },
        {
            id: "stat-done",
            label: "Selesai",
            value: stats.done,
            icon: "✅",
            iconBg: "bg-emerald-500/10",
            textClass: "text-emerald-600",
            borderClass: "border-emerald-500/20",
            shadowClass: "shadow-emerald-500/5",
            format: "number",
        },
        {
            id: "stat-revenue",
            label: "Total Revenue",
            value: stats.revenue,
            icon: "💰",
            iconBg: "bg-primary/10",
            textClass: "text-primary-700",
            borderClass: "border-primary/20",
            shadowClass: "shadow-primary/5",
            format: "currency",
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {cards.map((card) => (
                <div
                    key={card.id}
                    id={card.id}
                    className={`rounded-2xl p-5 transition-all hover:scale-[1.02] bg-white border ${card.borderClass} ${card.shadowClass} shadow-md`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${card.iconBg}`}
                        >
                            {card.icon}
                        </div>
                    </div>
                    <p
                        className={`text-2xl font-bold leading-tight ${card.textClass}`}
                    >
                        {card.format === "currency"
                            ? `Rp ${card.value.toLocaleString("id-ID")}`
                            : card.value}
                    </p>
                    <p className="text-xs font-medium mt-1 text-gray-400">
                        {card.label}
                    </p>
                </div>
            ))}
        </div>
    );
}
