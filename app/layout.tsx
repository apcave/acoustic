import Header from "@/components/Header";
import { Provider as AuthProvider } from "./provider";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acoustic",
  description:
    "Home page for the multi-layer acoustic application and Dr Alexander Paul Cave's homepage.",
  icons: { icon: "/acoustic-app.svg" },
  keywords: [
    "acoustic",
    "materials",
    "models",
    "resume",
    "sound",
    "wave",
    "react",
    "nextjs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Analytics />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-M5C46MC755"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M5C46MC755');
            `}
          </Script>
        </body>
      </html>
    </AuthProvider>
  );
}
