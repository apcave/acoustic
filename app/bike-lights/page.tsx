import type { Metadata } from "next";

import Link from "next/link";
import {
  WebContent,
  Heading,
  NamedList,
  Entry,
  TwoColumnContainer,
  ColumnText,
  ColumnImage,
  ColumnVideo,
} from "@/components/documents/Page";

import "@/components/documents/Page.css";
import Image from "next/image";

import schematic from "@/public/bike-lights-SCH.png";
import board from "@/public/bike-lights-PCB.png";
import inventor from "@/public/bike-lights-CAD.png";
import circuit from "@/public/bike-lights-CIR.jpeg";

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
      <WebContent
        name="Animated Wheel Mounted Bike Lights"
        text="Dr Alexander Paul Cave"
      >
        <Heading text="Project Description">
          <div style={{ height: "8px" }} />
        </Heading>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <video width="270" height="480" controls autoPlay loop>
              <source src="bike-lights.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="title-caption">
              Figure 1 - Prototype operating at 10 km/h
            </p>
          </div>
          <div style={{ flex: "1 1 0" }}>
            <p>
              This project explores the creation of disk-shaped colour
              animations on a rotating bicycle wheel using spoke-mounted LED
              pixel banks. As the wheel spins, timed flashes from the LEDs
              generate continuous streaks of colour through persistence of
              vision. The length of each streak is governed by the wheel’s
              angular velocity, while adding additional LED banks reduces
              visible strobing and improves image density.
            </p>
            <div style={{ height: "24px" }} />
            <p>
              To determine the angular position of the LEDs during rotation, a
              Hall-effect sensor is integrated into the LED bank, paired with a
              fixed magnet mounted on the fork. This configuration provides
              reliable rotational indexing without relying on external wiring.
              All computation and power storage are housed within the rotating
              wheel assembly itself due to the practical constraints of routing
              cables to the hub.
            </p>
            <div style={{ height: "24px" }} />
            <p>
              Figure 1 shows an early prototype operating on a test rig at an
              equivalent wheel speed of approximately 10 km/h. The apparent
              artefacts in the footage are a result of the video camera’s frame
              rate, and not the behaviour of the LEDs. In this demonstration,
              the LEDs illuminate with consistent colours across 12 angular
              segments of the wheel.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <p>Schematic</p>
          <div style={{ flex: "1 1 0" }}></div>
          <Image
            src={schematic}
            alt="Schematic"
            style={{ width: "270px", height: "auto" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <Image
            src={board}
            alt="PCB Board"
            style={{ width: "270px", height: "auto" }}
          />
          <div style={{ flex: "1 1 0" }}></div>
          <p>Electronics</p>
          <a href="tlc5916.pdf" target="_blank">
            Texas Instruments TCL5916 LED Driver Datasheet
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <p>Schematic</p>
          <div style={{ flex: "1 1 0" }}></div>
          <Image
            src={inventor}
            alt="Mechanical CAD"
            style={{ width: "270px", height: "auto" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <Image
            src={circuit}
            alt="PCB Sample"
            style={{ width: "270px", height: "auto" }}
          />
          <div style={{ flex: "1 1 0" }}></div>
          <p>Electronics</p>
        </div>
        <TwoColumnContainer>
          <ColumnText>Hello this is a test of the formatting</ColumnText>
          <ColumnImage
            src={schematic}
            alt="Schematic"
            caption="Figure 2 - Schematic diagram"
          />
        </TwoColumnContainer>
      </WebContent>
    </div>
  );
}
