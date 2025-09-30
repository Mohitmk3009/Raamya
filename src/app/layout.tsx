import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from "./context/CartContext";
import ConditionalHeader from "./components/ConditionalHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 💡 MODIFIED METADATA OBJECT FOR ANTI-ZOOMING 💡
export const metadata: Metadata = {
  title: "RAAMYA",
  description: "Your e-commerce clothing store",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflo`}
      >
        <AuthProvider>
          <CartProvider>
            <ConditionalHeader />

            {/* It's good practice to wrap your page content in a <main> tag */}
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}