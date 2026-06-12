import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Space_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Starbucks Café — Brewed with Precision, Served with Soul",
  description:
    "Experience artisan coffee like never before. Starbucks Café — where gravity ends and flavor begins. Premium hand-picked beans, master-roasted, crafted into moments.",
  keywords: [
    "coffee",
    "artisan",
    "luxury",
    "espresso",
    "soho",
    "nyc",
    "starbucks",
    "cafe",
    "specialty coffee",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${spaceMono.variable} bg-[#0E0E0E] text-white antialiased`} suppressHydrationWarning>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

