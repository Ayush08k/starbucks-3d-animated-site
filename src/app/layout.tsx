import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-[#0E0E0E] text-white antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
