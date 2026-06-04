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
            className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-all duration-300 overflow-hidden bg-white border-r border-secondary-100 ${
                isOpen ? "w-[260px]" : "w-[72px]"
            }`}
        >
            {/* Logo / Toggle */}
            <div
                className="flex items-center gap-3 px-4 py-5 border-b border-secondary-100"
            >
                <button
                    id="sidebar-toggle"
                    onClick={onToggle}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:bg-secondary-100 bg-secondary-50 text-secondary-700"
                    title="Toggle Sidebar"
                >
                    <span className="text-xl">☕</span>
                </button>
                {isOpen && (
                    <div className="overflow-hidden whitespace-nowrap">
                        <p className="text-secondary-800 font-bold text-sm leading-tight font-display">Olvad Admin</p>
                        <p className="text-xs font-semibold text-secondary-400">
                            Management Panel
                        </p>
                    </div>
                )}
            </div>

            {/* Section label */}
            {isOpen && (
                <div className="px-4 pt-5 pb-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary-400">
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
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all border ${
                                isActive
                                    ? "bg-primary-50 border-primary-200/60 text-primary-800 font-bold"
                                    : "bg-transparent border-transparent text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50/50"
                            }`}
                            title={item.desc}
                        >
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                            {isOpen && (
                                <div className="overflow-hidden">
                                    <p className="text-sm font-semibold leading-tight">{item.label}</p>
                                    <p
                                        className={`text-xs leading-tight mt-0.5 ${
                                            isActive ? "text-primary-700" : "text-secondary-400"
                                        }`}
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
            <div className="p-3 border-t border-secondary-100">
                <button
                    id="admin-logout-btn"
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-red-50 hover:text-red-600 text-secondary-500 font-semibold"
                    title="Keluar"
                >
                    <span className="text-xl flex-shrink-0">🚪</span>
                    {isOpen && <span className="text-sm font-bold">Keluar</span>}
                </button>
            </div>
        </aside>
    );
}
