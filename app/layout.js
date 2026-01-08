import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Brand title from company profile [cite: 3, 24]
  title: "Holmac interior",
  description: "Specializing in premium natural wall finishes including Venetian plaster, lime-based coatings, and earth walls[cite: 8, 17].",
  // Browser Icon Setup
  icons: {
    icon: "/holmac_circle.png", // This sets your browser tab icon
    apple: "/holmac_circle.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f6f1] text-[#2d2416]`}
      >        
        {children}
      </body>
    </html>
  );
}