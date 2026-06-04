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
                className="min-h-screen flex items-center justify-center bg-[#faf9f6] relative overflow-hidden"
            >
                {/* Decorative Blobs */}
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-100 rounded-full blur-3xl animate-pulse pointer-events-none opacity-40" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-tertiary-100 rounded-full blur-3xl animate-pulse pointer-events-none opacity-40" />

                <div className="w-full max-w-md px-6 relative z-10">
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 bg-primary-100 border border-primary-200"
                        >
                            <span className="text-4xl">☕</span>
                        </div>
                        <h1 className="font-display text-4xl font-bold text-secondary-800 mb-1">Olvad Admin</h1>
                        <p className="text-sm font-semibold text-secondary-400">
                            Dashboard Manajemen Lengkap
                        </p>
                    </div>
                    <div
                        className="rounded-3xl p-8 bg-white border border-secondary-100 shadow-xl"
                    >
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label
                                    className="block text-sm font-bold mb-2 text-secondary-700"
                                >
                                    Password Admin
                                </label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    placeholder="Masukkan password admin"
                                    className="w-full px-4 py-3.5 rounded-xl text-secondary-800 outline-none bg-secondary-50/50 border border-secondary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400 transition-all placeholder:text-secondary-300"
                                    autoFocus
                                />
                            </div>
                            {loginError && (
                                <div
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-red-50 text-red-600 border border-red-200/50"
                                >
                                    <span>⚠️</span> {loginError}
                                </div>
                            )}
                            <button
                                id="admin-login-btn"
                                type="submit"
                                className="w-full py-3.5 rounded-xl font-bold text-white transition-all btn-hover hover:scale-[1.02] bg-secondary hover:bg-secondary-700 shadow-md shadow-secondary-900/15"
                            >
                                Masuk ke Dashboard
                            </button>
                        </form>
                        <p className="text-xs font-semibold text-center mt-6 text-secondary-400">
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
