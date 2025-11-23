import type { Metadata } from "next";

import HomePage from "@/components/documents/HomePage";

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

export default function Home() {
  return <HomePage />;
}
