import type { Metadata } from "next";

import Link from "next/link";
import {
  WebContent,
  Heading,
  NamedList,
  Entry,
} from "@/components/documents/Page";

import "@/components/documents/Page.css";
import Image from "next/image";

import schematic from "@/public/bike-lights-SCH.png";
import board from "@/public/bike-lights-PCB.png";

export const metadata: Metadata = {
  title: "Acoustic",
  description:
    "Homepage for Dr Alexander Paul Cave's LED Animated Bike Lights project in C using the Zephyr RTOS on Nordic Semiconductor microcontrollers.",
  icons: { icon: "/acoustic-app.svg" },
  keywords: [
    "Zephyr",
    "C",
    "RTOS",
    "electronics",
    "bike lights",
    "LED displays",
  ],
};

export default function Home() {
  return (
    <div id="page">
      <WebContent>
        <h1>Animated Wheel Mounted Bike Lights</h1>
        <p />
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <video width="270" height="480" controls autoPlay loop>
            <source src="bike-lights.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={{ flex: "1 1 0" }}>
            <p>Hello</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <p>Schematic</p>
          <div style={{ flex: "1 1 0" }}></div>
          <Image
            src={schematic}
            alt="Schematic"
            style={{ width: "250px", height: "auto" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <Image
            src={board}
            alt="PCB Board"
            style={{ width: "250px", height: "auto" }}
          />
          <div style={{ flex: "1 1 0" }}></div>
          <p>Electronics</p>
        </div>
      </WebContent>
    </div>
  );
}
