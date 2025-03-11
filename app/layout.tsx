import Header from "@/components/Header";

import { Provider as AuthProvider } from "./provider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Header />
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
