import type { Metadata } from "next";
import { Poppins, Sour_Gummy } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sourGummy = Sour_Gummy({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Olvad - Specialty Coffee & Artisan Bakery",
  description: "Roti hangat & kopi terbaik untuk memulai harimu. Dibuat fresh setiap pagi dengan bahan premium tanpa pengawet.",
  openGraph: {
    title: "Olvad - Specialty Coffee & Artisan Bakery",
    description: "Roti hangat & kopi terbaik untuk memulai harimu",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#A9907F" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${poppins.variable} ${sourGummy.variable} font-sans bg-white text-primary-900 antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
