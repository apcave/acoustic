import type { Metadata } from "next";

import HomePage from '@/components/documents/HomePage';

export const metadata: Metadata = {
  title: "Acoustic",
  description: "Home page for the multi-layer acoustic application and Dr Alexander Paul Cave's homepage.",
};



export default function Home() {



  return (
    <HomePage />
  );
}