"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, ProductVariant, ProductVariantOption } from "@olvad/types";
import { LoadingState, ErrorState } from "./OrdersSection";
import {
    EmptyState,
    Modal,
    FormField,
    FormSelect,
    FormError,
    ModalActions,
} from "./CategoriesSection";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function VariantsSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingVariants, setIsLoadingVariants] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Variant modal
    const [variantModal, setVariantModal] = useState<"create" | "edit" | null>(null);
    const [editVariant, setEditVariant] = useState<ProductVariant | null>(null);
    const [variantForm, setVariantForm] = useState({ name: "", isSingleSelection: "true" });
    const [variantSaving, setVariantSaving] = useState(false);
    const [variantError, setVariantError] = useState("");

    // Option modal
    const [optionModal, setOptionModal] = useState<"create" | "edit" | null>(null);
    const [optionParentVariant, setOptionParentVariant] = useState<ProductVariant | null>(null);
    const [editOption, setEditOption] = useState<ProductVariantOption | null>(null);
    const [optionForm, setOptionForm] = useState({ name: "", addPrice: "0" });
    const [optionSaving, setOptionSaving] = useState(false);
    const [optionError, setOptionError] = useState("");

    const fetchProducts = useCallback(async () => {
        setIsLoadingProducts(true);
        try {
            const res = await fetch(`${API_BASE_URL}/product`);
            if (!res.ok) throw new Error("Gagal memuat produk");
            setProducts(await res.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error");
        } finally {
            setIsLoadingProducts(false);
        }
    }, []);

    const fetchVariants = useCallback(async (productId: number) => {
        setIsLoadingVariants(true);
        try {
            const res = await fetch(`${API_BASE_URL}/product-variant/product/${productId}`);
            if (!res.ok) throw new Error("Gagal memuat varian");
            setVariants(await res.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error");
        } finally {
            setIsLoadingVariants(false);
        }
    }, []);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);
    useEffect(() => {
        if (selectedProduct) fetchVariants(selectedProduct.id);
        else setVariants([]);
    }, [selectedProduct, fetchVariants]);

    // ---- Variant CRUD ----
    const openCreateVariant = () => {
        setEditVariant(null);
        setVariantForm({ name: "", isSingleSelection: "true" });
        setVariantError("");
        setVariantModal("create");
    };

    const openEditVariant = (v: ProductVariant) => {
        setEditVariant(v);
        setVariantForm({ name: v.name, isSingleSelection: String(v.isSingleSelection) });
        setVariantError("");
        setVariantModal("edit");
    };

    const handleSaveVariant = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!variantForm.name.trim()) { setVariantError("Nama varian wajib diisi"); return; }
        setVariantSaving(true);
        try {
            const payload = {
                name: variantForm.name.trim(),
                isSingleSelection: variantForm.isSingleSelection === "true",
                productId: selectedProduct!.id,
            };
            const url = editVariant
                ? `${API_BASE_URL}/product-variant/${editVariant.id}`
                : `${API_BASE_URL}/product-variant`;
            const res = await fetch(url, {
                method: editVariant ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Gagal menyimpan varian");
            await fetchVariants(selectedProduct!.id);
            setVariantModal(null);
        } catch (err) {
            setVariantError(err instanceof Error ? err.message : "Error");
        } finally {
            setVariantSaving(false);
        }
    };

    const handleDeleteVariant = async (v: ProductVariant) => {
        if (!confirm(`Hapus varian "${v.name}"? Semua opsi di dalamnya akan terhapus.`)) return;
        try {
            const res = await fetch(`${API_BASE_URL}/product-variant/${v.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Gagal menghapus");
            setVariants((prev) => prev.filter((x) => x.id !== v.id));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error");
        }
    };

    // ---- Option CRUD ----
    const openCreateOption = (variant: ProductVariant) => {
        setOptionParentVariant(variant);
        setEditOption(null);
        setOptionForm({ name: "", addPrice: "0" });
        setOptionError("");
        setOptionModal("create");
    };

    const openEditOption = (variant: ProductVariant, opt: ProductVariantOption) => {
        setOptionParentVariant(variant);
        setEditOption(opt);
        setOptionForm({ name: opt.name, addPrice: String(opt.addPrice) });
        setOptionError("");
        setOptionModal("edit");
    };

    const handleSaveOption = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!optionForm.name.trim()) { setOptionError("Nama opsi wajib diisi"); return; }
        setOptionSaving(true);
        try {
            const payload = {
                name: optionForm.name.trim(),
                addPrice: Number(optionForm.addPrice) || 0,
                productVariantId: optionParentVariant!.id,
            };
            const url = editOption
                ? `${API_BASE_URL}/product-variant/option/${editOption.id}`
                : `${API_BASE_URL}/product-variant/option`;
            const res = await fetch(url, {
                method: editOption ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Gagal menyimpan opsi");
            await fetchVariants(selectedProduct!.id);
            setOptionModal(null);
        } catch (err) {
            setOptionError(err instanceof Error ? err.message : "Error");
        } finally {
            setOptionSaving(false);
        }
    };

    const handleDeleteOption = async (opt: ProductVariantOption) => {
        if (!confirm(`Hapus opsi "${opt.name}"?`)) return;
        try {
            const res = await fetch(`${API_BASE_URL}/product-variant/option/${opt.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Gagal menghapus opsi");
            await fetchVariants(selectedProduct!.id);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Error");
        }
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                {/* Left: Product Picker */}
                <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #e5e7eb" }}>
                    <div className="px-5 py-4" style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <p className="font-bold text-sm" style={{ color: "#1a1a2e" }}>
                            Pilih Produk
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                            Pilih produk untuk kelola variannya
                        </p>
                    </div>
                    {isLoadingProducts ? (
                        <LoadingState label="Memuat produk..." />
                    ) : (
                        <div className="divide-y" style={{ divideColor: "#f3f4f6", maxHeight: "480px", overflowY: "auto" }}>
                            {products.map((p) => (
                                <button
                                    key={p.id}
                                    id={`pick-product-${p.id}`}
                                    onClick={() => setSelectedProduct(p)}
                                    className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all"
                                    style={{
                                        borderBottom: "1px solid #f3f4f6",
                                        background: selectedProduct?.id === p.id ? "rgba(171,196,170,0.12)" : "transparent",
                                        color: selectedProduct?.id === p.id ? "#588570" : "#374151",
                                    }}
                                >
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                                        style={{ background: "rgba(171,196,170,0.12)" }}
                                    >
                                        🍞
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">{p.name}</p>
                                        <p className="text-xs" style={{ color: "#9ca3af" }}>
                                            {p.category?.name} · Rp {p.price.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    {selectedProduct?.id === p.id && (
                                        <span style={{ color: "#abc4aa" }}>›</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Variants panel */}
                <div className="lg:col-span-2 space-y-4">
                    {!selectedProduct ? (
                        <div
                            className="rounded-2xl flex flex-col items-center justify-center py-24 gap-3"
                            style={{ background: "white", border: "1px dashed #e5e7eb" }}
                        >
                            <span className="text-4xl">👈</span>
                            <p className="text-gray-400 text-sm">Pilih produk di sebelah kiri</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-base" style={{ color: "#1a1a2e" }}>
                                        {selectedProduct.name}
                                    </p>
                                    <p className="text-xs" style={{ color: "#9ca3af" }}>
                                        {variants.length} varian terdaftar
                                    </p>
                                </div>
                                <button
                                    id="add-variant-btn"
                                    onClick={openCreateVariant}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90"
                                    style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
                                >
                                    ＋ Tambah Varian
                                </button>
                            </div>

                            {isLoadingVariants ? (
                                <LoadingState label="Memuat varian..." />
                            ) : variants.length === 0 ? (
                                <div
                                    className="rounded-2xl flex flex-col items-center justify-center py-16 gap-3"
                                    style={{ background: "white", border: "1px dashed #e5e7eb" }}
                                >
                                    <span className="text-3xl">🎛️</span>
                                    <p className="text-gray-400 text-sm">Belum ada varian untuk produk ini</p>
                                    <button
                                        onClick={openCreateVariant}
                                        className="px-5 py-2 rounded-xl text-sm font-semibold text-white"
                                        style={{ background: "#abc4aa" }}
                                    >
                                        Tambah Varian
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {variants.map((variant) => (
                                        <VariantCard
                                            key={variant.id}
                                            variant={variant}
                                            onEdit={() => openEditVariant(variant)}
                                            onDelete={() => handleDeleteVariant(variant)}
                                            onAddOption={() => openCreateOption(variant)}
                                            onEditOption={(opt) => openEditOption(variant, opt)}
                                            onDeleteOption={handleDeleteOption}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Variant Modal */}
            {variantModal && (
                <Modal
                    title={variantModal === "edit" ? "Edit Varian" : "Tambah Varian"}
                    onClose={() => setVariantModal(null)}
                >
                    <form onSubmit={handleSaveVariant} className="space-y-4">
                        <FormField
                            label="Nama Varian"
                            id="variant-name"
                            value={variantForm.name}
                            onChange={(v) => setVariantForm((f) => ({ ...f, name: v }))}
                            placeholder="Contoh: Ukuran, Suhu, Tingkat Gula"
                            required
                        />
                        <FormSelect
                            label="Tipe Pilihan"
                            id="variant-type"
                            value={variantForm.isSingleSelection}
                            onChange={(v) => setVariantForm((f) => ({ ...f, isSingleSelection: v }))}
                            options={[
                                { value: "true", label: "Pilih Satu (Radio)" },
                                { value: "false", label: "Pilih Banyak (Checkbox)" },
                            ]}
                        />
                        {variantError && <FormError message={variantError} />}
                        <ModalActions
                            onCancel={() => setVariantModal(null)}
                            isSaving={variantSaving}
                            label={variantModal === "edit" ? "Simpan" : "Tambah Varian"}
                        />
                    </form>
                </Modal>
            )}

            {/* Option Modal */}
            {optionModal && (
                <Modal
                    title={optionModal === "edit" ? "Edit Opsi" : `Tambah Opsi — ${optionParentVariant?.name}`}
                    onClose={() => setOptionModal(null)}
                >
                    <form onSubmit={handleSaveOption} className="space-y-4">
                        <FormField
                            label="Nama Opsi"
                            id="option-name"
                            value={optionForm.name}
                            onChange={(v) => setOptionForm((f) => ({ ...f, name: v }))}
                            placeholder="Contoh: Panas, Dingin, Large"
                            required
                        />
                        <FormField
                            label="Harga Tambahan (Rp)"
                            id="option-price"
                            type="number"
                            value={optionForm.addPrice}
                            onChange={(v) => setOptionForm((f) => ({ ...f, addPrice: v }))}
                            placeholder="0"
                            min="0"
                            step="500"
                        />
                        {optionError && <FormError message={optionError} />}
                        <ModalActions
                            onCancel={() => setOptionModal(null)}
                            isSaving={optionSaving}
                            label={optionModal === "edit" ? "Simpan" : "Tambah Opsi"}
                        />
                    </form>
                </Modal>
            )}
        </div>
    );
}

function VariantCard({
    variant,
    onEdit,
    onDelete,
    onAddOption,
    onEditOption,
    onDeleteOption,
}: {
    variant: ProductVariant;
    onEdit: () => void;
    onDelete: () => void;
    onAddOption: () => void;
    onEditOption: (opt: ProductVariantOption) => void;
    onDeleteOption: (opt: ProductVariantOption) => void;
}) {
    return (
        <div
            id={`variant-card-${variant.id}`}
            className="rounded-2xl overflow-hidden"
            style={{ background: "white", border: "1px solid #e5e7eb" }}
        >
            {/* Variant header */}
            <div
                className="flex items-center justify-between px-5 py-3.5"
                style={{ background: "#f8f9fb", borderBottom: "1px solid #e5e7eb" }}
            >
                <div className="flex items-center gap-3">
                    <span className="text-lg">🎛️</span>
                    <div>
                        <p className="font-bold text-sm" style={{ color: "#1a1a2e" }}>
                            {variant.name}
                        </p>
                        <p className="text-xs" style={{ color: "#9ca3af" }}>
                            {variant.isSingleSelection ? "Pilih satu" : "Pilih banyak"} · {variant.options?.length || 0} opsi
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        id={`add-option-${variant.id}`}
                        onClick={onAddOption}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                        style={{ background: "rgba(171,196,170,0.15)", color: "#588570" }}
                    >
                        ＋ Opsi
                    </button>
                    <button
                        id={`edit-variant-${variant.id}`}
                        onClick={onEdit}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all hover:opacity-80"
                        style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}
                    >
                        ✏️
                    </button>
                    <button
                        id={`delete-variant-${variant.id}`}
                        onClick={onDelete}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all hover:opacity-80"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                    >
                        🗑
                    </button>
                </div>
            </div>

            {/* Options list */}
            {variant.options && variant.options.length > 0 ? (
                <div className="divide-y" style={{ divideColor: "#f3f4f6" }}>
                    {variant.options.map((opt) => (
                        <div
                            key={opt.id}
                            id={`option-row-${opt.id}`}
                            className="flex items-center justify-between px-5 py-3"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: "#abc4aa" }}
                                />
                                <span className="text-sm font-medium" style={{ color: "#374151" }}>
                                    {opt.name}
                                </span>
                                {opt.addPrice > 0 && (
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full"
                                        style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}
                                    >
                                        +Rp {opt.addPrice.toLocaleString("id-ID")}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    id={`edit-option-${opt.id}`}
                                    onClick={() => onEditOption(opt)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                                    style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}
                                >
                                    ✏️
                                </button>
                                <button
                                    id={`delete-option-${opt.id}`}
                                    onClick={() => onDeleteOption(opt)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                                    style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="px-5 py-4 text-center">
                    <p className="text-xs" style={{ color: "#9ca3af" }}>
                        Belum ada opsi.{" "}
                        <button onClick={onAddOption} className="underline" style={{ color: "#abc4aa" }}>
                            Tambah opsi
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
}
