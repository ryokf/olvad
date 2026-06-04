"use client";

import { useState, useEffect, useCallback } from "react";
import { Category } from "@olvad/types";
import { LoadingState, ErrorState } from "./OrdersSection";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const emptyForm = { name: "" };

export default function CategoriesSection() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Category | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState("");

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/category`);
            if (!res.ok) throw new Error("Gagal memuat kategori");
            setCategories(await res.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchCategories(); }, [fetchCategories]);

    const openCreate = () => {
        setEditTarget(null);
        setForm(emptyForm);
        setFormError("");
        setIsModalOpen(true);
    };

    const openEdit = (cat: Category) => {
        setEditTarget(cat);
        setForm({ name: cat.name });
        setFormError("");
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) { setFormError("Nama kategori wajib diisi"); return; }
        setIsSaving(true);
        try {
            const url = editTarget
                ? `${API_BASE_URL}/category/${editTarget.id}`
                : `${API_BASE_URL}/category`;
            const res = await fetch(url, {
                method: editTarget ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: form.name.trim() }),
            });
            if (!res.ok) {
                const d = await res.json().catch(() => ({}));
                throw new Error(d.message || "Gagal menyimpan");
            }
            await fetchCategories();
            setIsModalOpen(false);
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (cat: Category) => {
        if (!confirm(`Hapus kategori "${cat.name}"? Semua produk dalam kategori ini mungkin terpengaruh.`)) return;
        try {
            const res = await fetch(`${API_BASE_URL}/category/${cat.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Gagal menghapus");
            setCategories((prev) => prev.filter((c) => c.id !== cat.id));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error");
        }
    };

    return (
        <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">
                        {categories.length} kategori terdaftar
                    </p>
                </div>
                <button
                    id="add-category-btn"
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all btn-hover hover:scale-[1.01] bg-secondary hover:bg-secondary-700 shadow-md shadow-secondary-900/10"
                >
                    ＋ Tambah Kategori
                </button>
            </div>

            {isLoading ? (
                <LoadingState label="Memuat kategori..." />
            ) : error ? (
                <ErrorState message={error} onRetry={fetchCategories} />
            ) : categories.length === 0 ? (
                <EmptyState label="Belum ada kategori" onAdd={openCreate} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            id={`category-card-${cat.id}`}
                            className="rounded-2xl p-5 flex flex-col gap-3 transition-all hover:shadow-md bg-white border border-secondary-100 shadow-[0_2px_8px_rgba(103,93,80,0.03)]"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-primary-100/60 text-primary-700"
                            >
                                🏷️
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-base text-secondary-800">
                                    {cat.name}
                                </p>
                                <p className="text-xs mt-1 font-mono font-bold text-secondary-400">
                                    ID: #{cat.id}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    id={`edit-cat-${cat.id}`}
                                    onClick={() => openEdit(cat)}
                                    className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:bg-primary-100 bg-primary-50 text-primary-600 border border-primary-200/40"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    id={`delete-cat-${cat.id}`}
                                    onClick={() => handleDelete(cat)}
                                    className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:bg-red-100 bg-red-50 text-red-600 border border-red-200/40"
                                >
                                    🗑 Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <Modal
                    title={editTarget ? "Edit Kategori" : "Tambah Kategori"}
                    onClose={() => setIsModalOpen(false)}
                >
                    <form onSubmit={handleSave} className="space-y-4">
                        <FormField
                            label="Nama Kategori"
                            id="cat-name"
                            value={form.name}
                            onChange={(v) => setForm({ name: v })}
                            placeholder="Contoh: Minuman, Roti, Dessert"
                            required
                        />
                        {formError && <FormError message={formError} />}
                        <ModalActions
                            onCancel={() => setIsModalOpen(false)}
                            isSaving={isSaving}
                            label={editTarget ? "Simpan Perubahan" : "Tambah Kategori"}
                        />
                    </form>
                </Modal>
            )}
        </div>
    );
}

/* ---- Shared UI helpers (exported for reuse) ---- */

export function EmptyState({ label, onAdd }: { label: string; onAdd: () => void }) {
    return (
        <div
            className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl bg-white border border-secondary-100 shadow-sm"
        >
            <span className="text-5xl">📭</span>
            <p className="text-secondary-500 font-semibold">{label}</p>
            <button
                onClick={onAdd}
                className="px-6 py-2.5 rounded-xl text-white text-sm font-bold bg-primary hover:bg-primary-600 transition-all shadow-md shadow-primary-500/10"
            >
                Tambah Baru
            </button>
        </div>
    );
}

export function Modal({
    title,
    onClose,
    children,
    wide = false,
}: {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    wide?: boolean;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full rounded-2xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(103,93,80,0.15)]"
                style={{
                    maxWidth: wide ? "720px" : "480px",
                    animation: "fadeInUp 0.2s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-secondary-800 to-secondary-900 border-b border-secondary-700/50"
                >
                    <h2 className="text-white font-bold text-base">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all bg-white/10"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

export function FormField({
    label,
    id,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    min,
    step,
}: {
    label: string;
    id: string;
    value: string | number;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    min?: string;
    step?: string;
}) {
    return (
        <div>
            <label className="block text-xs font-bold mb-1.5 text-secondary-600">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                min={min}
                step={step}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all bg-secondary-50/50 border border-secondary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400 text-secondary-800 placeholder:text-secondary-300"
            />
        </div>
    );
}

export function FormSelect({
    label,
    id,
    value,
    onChange,
    options,
    required = false,
}: {
    label: string;
    id: string;
    value: string | number;
    onChange: (v: string) => void;
    options: { value: string | number; label: string }[];
    required?: boolean;
}) {
    return (
        <div>
            <label className="block text-xs font-bold mb-1.5 text-secondary-600">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-secondary-50/50 border border-secondary-200 text-secondary-800 focus:border-primary-400 focus:ring-2 focus:ring-primary-400"
            >
                <option value="">Pilih...</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function FormTextarea({
    label,
    id,
    value,
    onChange,
    placeholder,
    rows = 3,
}: {
    label: string;
    id: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    rows?: number;
}) {
    return (
        <div>
            <label className="block text-xs font-bold mb-1.5 text-secondary-600">
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none bg-secondary-50/50 border border-secondary-200 text-secondary-800 focus:border-primary-400 focus:ring-2 focus:ring-primary-400"
            />
        </div>
    );
}

export function FormError({ message }: { message: string }) {
    return (
        <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-red-50 text-red-600 border border-red-200/50"
        >
            ⚠️ {message}
        </div>
    );
}

export function ModalActions({
    onCancel,
    isSaving,
    label,
}: {
    onCancel: () => void;
    isSaving: boolean;
    label: string;
}) {
    return (
        <div className="flex gap-3 pt-2">
            <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-secondary-50 border border-secondary-200 text-secondary-500"
            >
                Batal
            </button>
            <button
                type="submit"
                disabled={isSaving}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all border border-transparent shadow-md shadow-secondary-900/10 ${
                    isSaving
                        ? "bg-gray-400"
                        : "bg-secondary hover:bg-secondary-700"
                }`}
            >
                {isSaving ? "Menyimpan..." : label}
            </button>
        </div>
    );
}
