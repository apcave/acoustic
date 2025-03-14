import Header from "@/components/Header";
import { Provider as AuthProvider } from "./provider";
import "./globals.css";
import Script from "next/script";

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
