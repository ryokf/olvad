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
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
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
                            className="rounded-2xl p-5 flex flex-col gap-3 transition-all hover:shadow-md bg-white border border-gray-200"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-primary/15"
                            >
                                🏷️
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-base text-[#1a1a2e]">
                                    {cat.name}
                                </p>
                                <p className="text-xs mt-1 text-gray-400">
                                    ID: #{cat.id}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    id={`edit-cat-${cat.id}`}
                                    onClick={() => openEdit(cat)}
                                    className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80 bg-indigo-500/10 text-indigo-500"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    id={`delete-cat-${cat.id}`}
                                    onClick={() => handleDelete(cat)}
                                    className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80 bg-red-500/10 text-red-500"
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
            className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl bg-white border border-gray-200"
        >
            <span className="text-5xl">📭</span>
            <p className="text-gray-500 font-medium">{label}</p>
            <button
                onClick={onAdd}
                className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold bg-primary"
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
                className="w-full rounded-2xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                style={{
                    maxWidth: wide ? "720px" : "480px",
                    animation: "fadeInUp 0.2s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="flex items-center justify-between px-6 py-4 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-b border-white/10"
                >
                    <h2 className="text-white font-bold text-base">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-all bg-white/10"
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
            <label className="block text-xs font-semibold mb-1.5 text-gray-700">
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
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all bg-[#f8f9fb] border border-gray-200 text-gray-700"
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
            <label className="block text-xs font-semibold mb-1.5 text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-[#f8f9fb] border border-gray-200 text-gray-700"
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
            <label className="block text-xs font-semibold mb-1.5 text-gray-700">
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none bg-[#f8f9fb] border border-gray-200 text-gray-700"
            />
        </div>
    );
}

export function FormError({ message }: { message: string }) {
    return (
        <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-red-500/[0.08] text-red-500"
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
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80 border border-gray-200 text-gray-500"
            >
                Batal
            </button>
            <button
                type="submit"
                disabled={isSaving}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 ${
                    isSaving
                        ? "bg-gray-400"
                        : "bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
                }`}
            >
                {isSaving ? "Menyimpan..." : label}
            </button>
        </div>
    );
}
