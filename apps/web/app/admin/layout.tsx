import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard – Olvad",
    description: "Halaman manajemen pesanan dan pembayaran Olvad Coffee & Bakery",
    robots: "noindex, nofollow",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Admin uses its own full-page layout, no global Navbar/Footer
    return <>{children}</>;
}
