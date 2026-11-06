import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google"

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
  title: "Holmac Interior - House Interior Designers in Udupi",
  description: "Holmac Interior is a professional house interior design company in Udupi offering custom home interiors, modular kitchens, wardrobes, and turnkey interior solutions.",
  // Browser Icon Setup
  icons: {
    icon: "/holmac_circle.png", // This sets your browser tab icon
    apple: "/holmac_circle.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
    import Script from "next/script";
  <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-T8VRPXS3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f6f1] text-[#2d2416]`}
      >
        {children}
        <GoogleAnalytics gaId="G-31TNXZM639" />
      </body>
    </html>
  );
}
