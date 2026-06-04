"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, Category, ProductDetail } from "@olvad/types";
import { LoadingState, ErrorState } from "./OrdersSection";
import {
    EmptyState,
    Modal,
    FormField,
    FormSelect,
    FormTextarea,
    FormError,
    ModalActions,
} from "./CategoriesSection";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const emptyForm = {
    name: "",
    description: "",
    categoryId: "",
    price: "",
    tags: "",
    photo: "",
};

export default function ProductsSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<ProductDetail | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCat, setFilterCat] = useState("ALL");
    const [availFilter, setAvailFilter] = useState("ALL");

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [prodRes, catRes] = await Promise.all([
                fetch(`${API_BASE_URL}/product`),
                fetch(`${API_BASE_URL}/category`),
            ]);
            if (!prodRes.ok || !catRes.ok) throw new Error("Gagal memuat data");
            setProducts(await prodRes.json());
            setCategories(await catRes.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const filteredProducts = products.filter((p) => {
        const matchSearch =
            !searchQuery ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(p.id).includes(searchQuery);
        const matchCat = filterCat === "ALL" || String(p.categoryId) === filterCat;
        const matchAvail =
            availFilter === "ALL" ||
            (availFilter === "AVAILABLE" && p.available) ||
            (availFilter === "UNAVAILABLE" && !p.available);
        return matchSearch && matchCat && matchAvail;
    });

    const openCreate = () => {
        setEditTarget(null);
        setForm(emptyForm);
        setFormError("");
        setIsModalOpen(true);
    };

    const openEdit = async (product: Product) => {
        setFormError("");
        try {
            const res = await fetch(`${API_BASE_URL}/product/${product.id}`);
            const detail: ProductDetail = await res.json();
            setEditTarget(detail);
            setForm({
                name: detail.name,
                description: detail.description || "",
                categoryId: String(detail.categoryId),
                price: String(detail.price),
                tags: detail.tags || "",
                photo: detail.photo || "",
            });
        } catch {
            setEditTarget(product as any);
            setForm({
                name: product.name,
                description: "",
                categoryId: String(product.categoryId),
                price: String(product.price),
                tags: product.tags || "",
                photo: product.photo || "",
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) { setFormError("Nama produk wajib diisi"); return; }
        if (!form.categoryId) { setFormError("Pilih kategori"); return; }
        if (!form.price || Number(form.price) <= 0) { setFormError("Harga harus lebih dari 0"); return; }

        setIsSaving(true);
        const payload = {
            name: form.name.trim(),
            description: form.description.trim() || undefined,
            categoryId: Number(form.categoryId),
            price: Number(form.price),
            tags: form.tags.trim() || undefined,
            photo: form.photo.trim() || undefined,
        };

        try {
            const url = editTarget
                ? `${API_BASE_URL}/product/${editTarget.id}`
                : `${API_BASE_URL}/product`;
            const res = await fetch(url, {
                method: editTarget ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const d = await res.json().catch(() => ({}));
                throw new Error(d.message || "Gagal menyimpan");
            }
            await fetchData();
            setIsModalOpen(false);
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleAvailable = async (product: Product) => {
        try {
            const res = await fetch(`${API_BASE_URL}/product/${product.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ available: !product.available }),
            });
            if (!res.ok) throw new Error("Gagal update");
            setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? { ...p, available: !p.available } : p))
            );
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error");
        }
    };

    const handleDelete = async (product: Product) => {
        if (!confirm(`Hapus produk "${product.name}"?`)) return;
        try {
            const res = await fetch(`${API_BASE_URL}/product/${product.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Gagal menghapus");
            setProducts((prev) => prev.filter((p) => p.id !== product.id));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error");
        }
    };

    return (
        <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">🔍</span>
                    <input
                        id="products-search"
                        type="text"
                        placeholder="Cari nama produk..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none w-52 bg-white border border-secondary-200 text-secondary-800 focus:border-primary-400 focus:ring-2 focus:ring-primary-400 placeholder:text-secondary-300"
                    />
                </div>
                <select
                    id="products-filter-cat"
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    className="px-4 py-2 rounded-xl text-sm outline-none bg-white border border-secondary-200 text-secondary-800 focus:border-primary-400 focus:ring-2 focus:ring-primary-400 font-semibold"
                >
                    <option value="ALL">Semua Kategori</option>
                    {categories.map((c) => (
                        <option key={c.id} value={String(c.id)}>{c.name}</option>
                    ))}
                </select>
                <select
                    id="products-filter-avail"
                    value={availFilter}
                    onChange={(e) => setAvailFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl text-sm outline-none bg-white border border-secondary-200 text-secondary-800 focus:border-primary-400 focus:ring-2 focus:ring-primary-400 font-semibold"
                >
                    <option value="ALL">Semua Status</option>
                    <option value="AVAILABLE">✅ Tersedia</option>
                    <option value="UNAVAILABLE">❌ Tidak Tersedia</option>
                </select>
                <p className="text-sm ml-1 font-semibold text-secondary-400">
                    {filteredProducts.length} produk
                </p>
                <div className="ml-auto">
                    <button
                        id="add-product-btn"
                        onClick={openCreate}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all btn-hover hover:scale-[1.01] bg-secondary hover:bg-secondary-700 shadow-md shadow-secondary-900/10"
                    >
                        ＋ Tambah Menu
                    </button>
                </div>
            </div>

            {isLoading ? (
                <LoadingState label="Memuat produk..." />
            ) : error ? (
                <ErrorState message={error} onRetry={fetchData} />
            ) : filteredProducts.length === 0 ? (
                <EmptyState label="Belum ada produk" onAdd={openCreate} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={() => openEdit(product)}
                            onDelete={() => handleDelete(product)}
                            onToggleAvailable={() => handleToggleAvailable(product)}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <Modal
                    title={editTarget ? `Edit: ${editTarget.name}` : "Tambah Menu Baru"}
                    onClose={() => setIsModalOpen(false)}
                    wide
                >
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <FormField
                                    label="Nama Produk"
                                    id="prod-name"
                                    value={form.name}
                                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                                    placeholder="Contoh: Cappuccino, Croissant"
                                    required
                                />
                            </div>
                            <FormSelect
                                label="Kategori"
                                id="prod-category"
                                value={form.categoryId}
                                onChange={(v) => setForm((f) => ({ ...f, categoryId: v }))}
                                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                                required
                            />
                            <FormField
                                label="Harga (Rp)"
                                id="prod-price"
                                type="number"
                                value={form.price}
                                onChange={(v) => setForm((f) => ({ ...f, price: v }))}
                                placeholder="25000"
                                required
                                min="0"
                                step="500"
                            />
                            <div className="col-span-2">
                                <FormTextarea
                                    label="Deskripsi"
                                    id="prod-description"
                                    value={form.description}
                                    onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                                    placeholder="Deskripsi singkat produk..."
                                />
                            </div>
                            <FormField
                                label="Tags (pisahkan koma)"
                                id="prod-tags"
                                value={form.tags}
                                onChange={(v) => setForm((f) => ({ ...f, tags: v }))}
                                placeholder="bestseller, hot, new"
                            />
                            <FormField
                                label="URL Foto"
                                id="prod-photo"
                                value={form.photo}
                                onChange={(v) => setForm((f) => ({ ...f, photo: v }))}
                                placeholder="https://..."
                            />
                        </div>
                        {formError && <FormError message={formError} />}
                        <ModalActions
                            onCancel={() => setIsModalOpen(false)}
                            isSaving={isSaving}
                            label={editTarget ? "Simpan Perubahan" : "Tambah Menu"}
                        />
                    </form>
                </Modal>
            )}
        </div>
    );
}

function ProductCard({
    product,
    onEdit,
    onDelete,
    onToggleAvailable,
}: {
    product: Product;
    onEdit: () => void;
    onDelete: () => void;
    onToggleAvailable: () => void;
}) {
    return (
        <div
            id={`product-card-${product.id}`}
            className={`rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-md bg-white border border-secondary-100 shadow-[0_2px_8px_rgba(103,93,80,0.03)] ${
                product.available ? "opacity-100" : "opacity-70"
            }`}
        >
            {/* Image */}
            <div
                className="relative h-40 flex items-center justify-center bg-gradient-to-br from-[#f6faf4] to-[#eef5e8]"
            >
                {product.photo ? (
                    <img
                        src={product.photo}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                ) : (
                    <span className="text-5xl">🍞</span>
                )}
                {/* Available toggle */}
                <button
                    id={`toggle-avail-${product.id}`}
                    onClick={onToggleAvailable}
                    className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold transition-all hover:opacity-85 border backdrop-blur-sm ${
                        product.available
                            ? "bg-primary-100 text-primary-700 border-primary-200/50"
                            : "bg-red-50 text-red-600 border-red-200/50"
                    }`}
                >
                    {product.available ? "● Tersedia" : "● Habis"}
                </button>
                {/* Category badge */}
                <div
                    className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 text-secondary-600 border border-secondary-100"
                >
                    {product.category?.name || "–"}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                    <p className="font-bold text-sm leading-tight text-secondary-800">
                        {product.name}
                    </p>
                    {product.tags && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                            {product.tags.split(",").map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary-700 border border-primary-200/20"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <p className="text-base font-extrabold text-primary-700">
                    Rp {product.price.toLocaleString("id-ID")}
                </p>
                <div className="flex gap-2 mt-auto">
                    <button
                        id={`edit-product-${product.id}`}
                        onClick={onEdit}
                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:bg-primary-100 bg-primary-50 text-primary-600 border border-primary-200/40"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        id={`delete-product-${product.id}`}
                        onClick={onDelete}
                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:bg-red-100 bg-red-50 text-red-600 border border-red-200/40"
                    >
                        🗑 Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
