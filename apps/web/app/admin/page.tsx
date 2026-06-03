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
                className="min-h-screen flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
            >
                <div className="w-full max-w-md px-6">
                    <div className="text-center mb-10">
                        <div
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4"
                            style={{ background: "rgba(171,196,170,0.15)", border: "1px solid rgba(171,196,170,0.3)" }}
                        >
                            <span className="text-4xl">☕</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1">Olvad Admin</h1>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Dashboard Manajemen Lengkap
                        </p>
                    </div>
                    <div
                        className="rounded-2xl p-8"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    Password Admin
                                </label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    placeholder="Masukkan password admin"
                                    className="w-full px-4 py-3 rounded-xl text-white outline-none"
                                    style={{
                                        background: "rgba(255,255,255,0.07)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                    }}
                                    autoFocus
                                />
                            </div>
                            {loginError && (
                                <div
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                                    style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5" }}
                                >
                                    <span>⚠️</span> {loginError}
                                </div>
                            )}
                            <button
                                id="admin-login-btn"
                                type="submit"
                                className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                                style={{ background: "linear-gradient(135deg, #abc4aa, #8fb597)" }}
                            >
                                Masuk ke Dashboard
                            </button>
                        </form>
                        <p className="text-xs text-center mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
                            Hanya untuk staf yang berwenang
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex" style={{ background: "#f8f9fb", fontFamily: "var(--font-sans)" }}>
            <AdminSidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                onLogout={handleLogout}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div
                className="flex-1 min-h-screen transition-all duration-300 flex flex-col"
                style={{ marginLeft: sidebarOpen ? "260px" : "72px" }}
            >
                {/* Top bar */}
                <header
                    className="sticky top-0 z-20 flex items-center justify-between px-6 py-4"
                    style={{
                        background: "rgba(248,249,251,0.95)",
                        backdropFilter: "blur(12px)",
                        borderBottom: "1px solid #e5e7eb",
                    }}
                >
                    <div>
                        <h1 className="text-xl font-bold" style={{ color: "#1a1a2e" }}>
                            {activeTab === "orders" && "📋 Manajemen Pesanan"}
                            {activeTab === "products" && "🍞 Manajemen Menu"}
                            {activeTab === "categories" && "🏷️ Manajemen Kategori"}
                            {activeTab === "variants" && "🎛️ Manajemen Varian"}
                        </h1>
                        <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                            Olvad Coffee & Bakery — Admin Panel
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
                            style={{ background: "rgba(171,196,170,0.15)", color: "#588570" }}
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
