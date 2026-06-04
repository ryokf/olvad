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
            iconBg: "bg-tertiary-100/60",
            textClass: "text-tertiary-700",
            borderClass: "border-tertiary-200/50",
            shadowClass: "shadow-tertiary-400/5",
            format: "number",
        },
        {
            id: "stat-unpaid",
            label: "Belum Bayar",
            value: stats.unpaid,
            icon: "⏳",
            iconBg: "bg-amber-100/60",
            textClass: "text-amber-700",
            borderClass: "border-amber-200/50",
            shadowClass: "shadow-amber-400/5",
            format: "number",
        },
        {
            id: "stat-processing",
            label: "Diproses",
            value: stats.onProcess,
            icon: "🔥",
            iconBg: "bg-orange-100/60",
            textClass: "text-orange-700",
            borderClass: "border-orange-200/50",
            shadowClass: "shadow-orange-400/5",
            format: "number",
        },
        {
            id: "stat-done",
            label: "Selesai",
            value: stats.done,
            icon: "✅",
            iconBg: "bg-primary-100/60",
            textClass: "text-primary-700",
            borderClass: "border-primary-200/50",
            shadowClass: "shadow-primary-400/5",
            format: "number",
        },
        {
            id: "stat-revenue",
            label: "Total Revenue",
            value: stats.revenue,
            icon: "💰",
            iconBg: "bg-primary/20",
            textClass: "text-primary-800",
            borderClass: "border-primary/30",
            shadowClass: "shadow-primary-500/5",
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
                    <p className="text-xs font-semibold mt-1 text-secondary-400">
                        {card.label}
                    </p>
                </div>
            ))}
        </div>
    );
}
