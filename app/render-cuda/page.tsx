import type { Metadata } from "next";

import AlexCV from '@/components/documents/AlexCV';

export const metadata: Metadata = {
  title: "Alex's Resume",
  description: "Dr Alexander Paul Cave's resume for computer programming, C# C++,C, python, JavaScript, React, Node.",
};

export default function Resume() {
    return (
        <AlexCV />
    )
}