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
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
            >
                <div className="w-full max-w-md px-6">
                    <div className="text-center mb-10">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 bg-primary/15 border border-primary/30"
                        >
                            <span className="text-4xl">☕</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1">Olvad Admin</h1>
                        <p className="text-sm text-white/50">
                            Dashboard Manajemen Lengkap
                        </p>
                    </div>
                    <div
                        className="rounded-2xl p-8 bg-white/5 backdrop-blur-[20px] border border-white/10"
                    >
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2 text-white/70"
                                >
                                    Password Admin
                                </label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    placeholder="Masukkan password admin"
                                    className="w-full px-4 py-3 rounded-xl text-white outline-none bg-white/[0.07] border border-white/15"
                                    autoFocus
                                />
                            </div>
                            {loginError && (
                                <div
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-red-500/15 text-red-200"
                                >
                                    <span>⚠️</span> {loginError}
                                </div>
                            )}
                            <button
                                id="admin-login-btn"
                                type="submit"
                                className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] bg-gradient-to-br from-primary-400 to-primary-500"
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
        <div className="min-h-screen flex bg-[#f8f9fb]">
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
                    className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#f8f9fb]/95 backdrop-blur-[12px] border-b border-gray-200"
                >
                    <div>
                        <h1 className="text-xl font-bold text-[#1a1a2e]">
                            {activeTab === "orders" && "📋 Manajemen Pesanan"}
                            {activeTab === "products" && "🍞 Manajemen Menu"}
                            {activeTab === "categories" && "🏷️ Manajemen Kategori"}
                            {activeTab === "variants" && "🎛️ Manajemen Varian"}
                        </h1>
                        <p className="text-xs mt-0.5 text-gray-400">
                            Olvad Coffee & Bakery — Admin Panel
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-primary/15 text-primary-700"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
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
