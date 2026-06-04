"use client";

import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./components/AdminSidebar";
import StatsCards from "./components/StatsCards";

// Tab sections
import OrdersSection from "./sections/OrdersSection";
import ProductsSection from "./sections/ProductsSection";
import CategoriesSection from "./sections/CategoriesSection";
import VariantsSection from "./sections/VariantsSection";

export type AdminTab = "orders" | "products" | "categories" | "variants";

export default function AdminDashboardPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<AdminTab>("orders");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (adminPassword === "olvadadmin") {
            setIsAuthenticated(true);
            setLoginError("");
            sessionStorage.setItem("admin_auth", "true");
        } else {
            setLoginError("Password salah. Coba lagi.");
        }
    };

    useEffect(() => {
        const auth = sessionStorage.getItem("admin_auth");
        if (auth === "true") setIsAuthenticated(true);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-900 via-[#2d2722] to-secondary-950 relative overflow-hidden"
            >
                {/* Decorative Blobs */}
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-tertiary-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

                <div className="w-full max-w-md px-6 relative z-10">
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 bg-primary/10 border border-primary/20"
                        >
                            <span className="text-4xl">☕</span>
                        </div>
                        <h1 className="font-display text-4xl font-bold text-white mb-1">Olvad Admin</h1>
                        <p className="text-sm text-white/50">
                            Dashboard Manajemen Lengkap
                        </p>
                    </div>
                    <div
                        className="rounded-3xl p-8 bg-white/[0.03] backdrop-blur-[20px] border border-white/10 shadow-2xl"
                    >
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label
                                    className="block text-sm font-semibold mb-2 text-white/70"
                                >
                                    Password Admin
                                </label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    placeholder="Masukkan password admin"
                                    className="w-full px-4 py-3.5 rounded-xl text-white outline-none bg-white/[0.05] border border-white/10 focus:border-primary-400 focus:ring-2 focus:ring-primary-400 transition-all placeholder:text-white/20"
                                    autoFocus
                                />
                            </div>
                            {loginError && (
                                <div
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-red-500/15 text-red-200 border border-red-500/20"
                                >
                                    <span>⚠️</span> {loginError}
                                </div>
                            )}
                            <button
                                id="admin-login-btn"
                                type="submit"
                                className="w-full py-3.5 rounded-xl font-bold text-white transition-all btn-hover hover:scale-[1.02] bg-gradient-to-br from-primary-400 to-primary-500 shadow-lg shadow-primary-500/20"
                            >
                                Masuk ke Dashboard
                            </button>
                        </form>
                        <p className="text-xs text-center mt-6 text-white/30">
                            Hanya untuk staf yang berwenang
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-[#faf9f6]">
            <AdminSidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                onLogout={handleLogout}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div
                className={`flex-1 min-h-screen transition-all duration-300 flex flex-col ${sidebarOpen ? "ml-[260px]" : "ml-[72px]"}`}
            >
                {/* Top bar */}
                <header
                    className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#faf9f6]/95 backdrop-blur-[12px] border-b border-secondary-100/80"
                >
                    <div>
                        <h1 className="text-xl font-bold text-secondary-800">
                            {activeTab === "orders" && "📋 Manajemen Pesanan"}
                            {activeTab === "products" && "🍞 Manajemen Menu"}
                            {activeTab === "categories" && "🏷️ Manajemen Kategori"}
                            {activeTab === "variants" && "🎛️ Manajemen Varian"}
                        </h1>
                        <p className="text-xs mt-0.5 text-secondary-400">
                            Olvad Coffee & Bakery — Admin Panel
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary-100 text-primary-800 border border-primary-200/50"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary-500 inline-block animate-pulse" />
                            Admin
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {activeTab === "orders" && <OrdersSection />}
                    {activeTab === "products" && <ProductsSection />}
                    {activeTab === "categories" && <CategoriesSection />}
                    {activeTab === "variants" && <VariantsSection />}
                </main>
            </div>
        </div>
    );
}
