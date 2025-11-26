import type { Metadata } from "next";

import {
  WebContent,
  Heading,
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
    "Homepage for Dr Alexander Paul Cave&apos;s LED Animated Bike Lights project in C using the Zephyr RTOS on Nordic Semiconductor microcontrollers.",
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
        <TwoColumnContainer>
          <ColumnVideo
            src="bike-lights.mp4"
            caption="Figure 1 - Prototype operating at 10 km/h"
          />
          <div className="column">
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
        </TwoColumnContainer>
        <TwoColumnContainer>
          <ColumnText>
            The light banks are built from two custom-designed printed circuit
            boards, each incorporating a{" "}
            <a href="tlc5916.pdf" target="_blank">
              Texas Instruments TLC5916
            </a>{" "}
            LED driver with 15 pulse-width modulation (PWM) channels. Every
            controller is addressable over the I²C bus, with its device address
            configured via onboard DIP switches. Each PWM channel also includes
            its own sub-address and duty-cycle setting, allowing colour and
            brightness control through simple addressed byte writes.
          </ColumnText>
          <ColumnImage
            src={schematic}
            alt="Schematic"
            caption="Figure 2 - Schematic diagram"
          />
        </TwoColumnContainer>
        <TwoColumnContainer>
          <ColumnImage
            src={board}
            alt="PCB Board"
            caption="Figure 3 - PCB layout"
          />
          <div className="column">
            <p>
              Five RGB colour LEDs are mounted directly on each PCB. The PWM
              channels are grouped in sets of three—one each for red, green, and
              blue—providing full RGB control for every pixel. With this
              architecture, each LED driver and LED bank can be assigned a
              unique address, while requiring only four wires for operation: two
              for the 5 V power and ground, and two for the I²C data and clock
              lines.
            </p>
            <div style={{ height: "24px" }} />
            <p>
              Figure 2 shows the schematic for the LED bank, Figure 3
              illustrates the PCB layout, and Figure 4 presents the final
              assembled board. Both the schematic and PCB layout were created in
              Autodesk Eagle CAD, with fabrication and assembly outsourced to{" "}
              <a
                href="https://www.seeedstudio.com/fusion_pcb.html"
                target="_blank"
              >
                Seeed Studio
              </a>{" "}
              in Hong Kong.
            </p>
          </div>
        </TwoColumnContainer>
        <TwoColumnContainer>
          <div className="column">
            <p>
              <a
                href="https://www.autodesk.com/au/products/inventor/overview"
                target="_blank"
              >
                Autodesk Inventor
              </a>{" "}
              was used to design the in-hub spoke mountings for several key
              components:
            </p>
            <ul className="dots">
              <li>the LED PCB assemblies that form each light bank,</li>
              <li>
                the power banks used to supply the system from mobile-phone
                batteries, and
              </li>
              <li>the enclosure for the control electronics.</li>
            </ul>

            <div style={{ height: "24px" }} />
            <p>
              Designing these mounts was particularly challenging due to the
              irregular geometry of the wheel hub and spokes, which required
              accurate measurement and the creation of a detailed 3D model. The
              LED bank mounts also incorporated precise features to secure the
              PCB, position the hall-effect sensor, and route wiring through
              dedicated internal cavities. Once finalised, all mounts were
              produced using 3D printing.
            </p>
          </div>
          <ColumnImage
            src={circuit}
            alt="PCB Board"
            caption="Figure 4 - Assembled PCB"
          />
        </TwoColumnContainer>
        <TwoColumnContainer>
          <ColumnImage
            src={inventor}
            alt="CAD Design"
            caption="Figure 5 - CAD design of spoke mounts"
          />
          <div className="column">
            <p>
              The test rig was also developed in Autodesk Inventor, combining
              the base of an office chair with a bicycle fork to create a stable
              and adjustable platform. A DC motor and PWM speed controller were
              selected to drive the wheel, powered by a Makita lithium-ion
              battery. The speed controller and battery mount were sourced from
              eBay, while all braces, fittings, and structural adapters were
              custom-designed and 3D-printed. A view of the complete test-rig
              assembly is shown in Figure 5.
            </p>
            <div style={{ height: "24px" }} />
            <p>
              During the first design iteration, a{" "}
              <a
                href="https://www.raspberrypi.com/products/raspberry-pi-zero/"
                target="_blank"
              >
                Raspberry Pi Zero (RPI)
              </a>{" "}
              was used for system control. This choice was largely driven by
              convenience—the RPI provides a full operating system, Wi-Fi
              connectivity, a filesystem, and straightforward Python-based
              hardware interfaces, which made it easy to prototype and get the
              system operating quickly. However, the setup introduced several
              limitations. The hall-effect sensor interrupt suffered from
              inconsistent latency, leading to unreliable timing measurements.
              Boot time and power consumption were also higher than ideal.
            </p>
          </div>
        </TwoColumnContainer>
        <p>
          Controlling and programming the RPI over SSH via Wi-Fi while the wheel
          was spinning worked surprisingly well, but for the next design
          iteration it became clear that a more efficient and deterministic
          platform was needed. To reduce cost, power usage, and startup time—and
          to achieve more precise timing with Bluetooth support—the Nordic
          nRF52840 was selected as the new controller.
        </p>
        <div style={{ height: "24px" }} />
        <p>
          effort. Fortunately,{" "}
          <a
            href="https://www.nordicsemi.com/Products/Wireless/Bluetooth-Low-Energy"
            target="_blank"
          >
            Nordic microcontrollers
          </a>{" "}
          are well supported by the{" "}
          <a href="https://www.zephyrproject.org/" target="_blank">
            Zephyr Real-Time Operating System (RTOS).
          </a>{" "}
          Zephyr offers the flexibility of near–bare-metal programming while
          providing threads, memory management, and a wide range of
          plug-and-play subsystems that accelerate development. The decision was
          made to run the nRF52840 with Zephyr using a{" "}
          <a href="https://wiki.seeedstudio.com/XIAO_BLE/" target="_blank">
            Seeed XIAO evaluation board.
          </a>{" "}
          This configuration proved reliable and was used for the demonstration
          video. Additional advantages of the nRF52840 included its compact size
          and low cost.
        </p>
        <div style={{ height: "24px" }} />
        <p>
          In the next design iteration, each spoke mount will carry four LED
          banks, with an MCU integrated into each bank. This modular approach
          will allow additional banks to be added easily, increasing animation
          resolution and visual quality. It will also reduce wiring
          complexity—each bank will require only two power wires, and the
          shortened I²C paths will allow higher bus speeds and improved LED
          responsiveness.
        </p>
        <div style={{ height: "24px" }} />
        <Heading text="MCU Firmware Overview" />
        The firmware powering the system includes a range of features designed
        for flexibility, reliability, and easy field updates.
        <div style={{ height: "12px" }} />
        Key capabilities include:
        <ul className="dots">
          <li>
            <b>Bluetooth Over-the-Air (OTA) Updates</b> - Seamless wireless
            delivery of firmware upgrades without the need for physical
            connections.
          </li>
          <li>
            <b>Custom Animation Data Format</b> - A purpose-built file structure
            that defines LED animations, allowing new visual patterns to be
            uploaded via OTA.
          </li>
          <li>
            <b>OTA Logging & Test Commands</b> - Remote access to system logs
            and diagnostic commands to support development, testing, and
            troubleshooting.
          </li>
          <li>
            <b>Real-Time Timing & Hardware Interfaces</b> - Precise control of
            timing signals and integration with the system&apos;s electronic
            interfaces.
          </li>
        </ul>
        <div style={{ height: "12px" }} />
        For a detailed technical description and full access to the source code,
        please visit the{" "}
        <a href="https://github.com/apcave/bike-lights" target="_blank">
          GitHub repository
        </a>{" "}
        link or the menu.
      </WebContent>
    </div>
  );
}
