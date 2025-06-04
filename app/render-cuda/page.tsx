import type { Metadata } from "next";

import PageCuda from "@/components/documents/AcousticRenderer";

export const metadata: Metadata = {
  title: "Acoustic",
  description:
    "Home page for the Sonar Render in C++/CUDA by Dr Alexander Paul Cave",
  icons: { icon: "/acoustic-app.svg" },
  keywords: [
    "acoustic",
    "render",
    "sonar",
    "sound",
    "wave",
    "Kirchhoff",
    "wave equation",
    "CUDA",
    "C++",
    "NVIDIA",
    "parallel computing",
    "high performance computing",
    "GPU rendering",
    "acoustic simulation",
    "acoustic modeling",
    "acoustic rendering",
    "acoustic wave propagation",
    "acoustic imaging",
    "acoustic visualization",
    "acoustic research",
    "acoustic engineering",
    "acoustic applications",
    "acoustic technology",
    "acoustic software",
    "acoustic algorithms",
    "acoustic physics",
  ],
};

export default function Home() {
  return <PageCuda />;
}
