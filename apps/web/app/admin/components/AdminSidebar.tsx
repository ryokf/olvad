"use client";

import { AdminTab } from "../page";

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    onLogout: () => void;
    activeTab: AdminTab;
    onTabChange: (tab: AdminTab) => void;
}

const navItems: { key: AdminTab; label: string; icon: string; desc: string }[] = [
    { key: "orders", label: "Pesanan", icon: "📋", desc: "Kelola semua pesanan" },
    { key: "products", label: "Menu", icon: "🍞", desc: "Tambah/edit produk" },
    { key: "categories", label: "Kategori", icon: "🏷️", desc: "Atur kategori menu" },
    { key: "variants", label: "Varian", icon: "🎛️", desc: "Opsi ukuran, rasa, dll" },
];

export default function AdminSidebar({
    isOpen,
    onToggle,
    onLogout,
    activeTab,
    onTabChange,
}: SidebarProps) {
    return (
        <aside
            className="fixed top-0 left-0 h-full z-30 flex flex-col transition-all duration-300 overflow-hidden"
            style={{
                width: isOpen ? "260px" : "72px",
                background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
                borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            {/* Logo / Toggle */}
            <div
                className="flex items-center gap-3 px-4 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
                <button
                    id="sidebar-toggle"
                    onClick={onToggle}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:opacity-80"
                    style={{ background: "rgba(171,196,170,0.15)" }}
                    title="Toggle Sidebar"
                >
                    <span className="text-xl">☕</span>
                </button>
                {isOpen && (
                    <div className="overflow-hidden whitespace-nowrap">
                        <p className="text-white font-bold text-sm leading-tight">Olvad Admin</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Management Panel
                        </p>
                    </div>
                )}
            </div>

            {/* Section label */}
            {isOpen && (
                <div className="px-4 pt-5 pb-1">
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
                        Menu
                    </p>
                </div>
            )}

            {/* Nav items */}
            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = activeTab === item.key;
                    return (
                        <button
                            key={item.key}
                            id={`nav-${item.key}`}
                            onClick={() => onTabChange(item.key)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                            style={{
                                background: isActive
                                    ? "rgba(171,196,170,0.2)"
                                    : "transparent",
                                border: isActive
                                    ? "1px solid rgba(171,196,170,0.3)"
                                    : "1px solid transparent",
                                color: isActive ? "#abc4aa" : "rgba(255,255,255,0.55)",
                            }}
                            title={item.desc}
                        >
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                            {isOpen && (
                                <div className="overflow-hidden">
                                    <p className="text-sm font-medium leading-tight">{item.label}</p>
                                    <p
                                        className="text-xs leading-tight mt-0.5"
                                        style={{ color: isActive ? "rgba(171,196,170,0.7)" : "rgba(255,255,255,0.3)" }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <button
                    id="admin-logout-btn"
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    title="Keluar"
                >
                    <span className="text-xl flex-shrink-0">🚪</span>
                    {isOpen && <span className="text-sm">Keluar</span>}
                </button>
            </div>
        </aside>
    );
}
