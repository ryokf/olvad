import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
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
        <meta name="theme-color" content="#675d50" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-white text-primary-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
