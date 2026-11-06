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
    <Script id="google-tag-manager" strategy="afterInteractive">
  {`
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-T8VRPXS3');
  `}
</Script>

<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-T8VRPXS3"
    height="0"
    width="0"
    style={{ display: "none", visibility: "hidden" }}
  />
</noscript>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f6f1] text-[#2d2416]`}
      >
        {children}
        <GoogleAnalytics gaId="G-31TNXZM639" />
      </body>
    </html>
  );
}
