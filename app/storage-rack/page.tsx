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

import image from "@/public/rack-IMG.png";
import inventor from "@/public/rack-CAD.jpeg";

export const metadata: Metadata = {
  title: "Acoustic",
  description:
    "Homepage for Dr Alexander Paul Cave&apos;s Modular storage rack project using 3D printing and CAD design.",
  icons: { icon: "/acoustic-app.svg" },
  keywords: [
    "3D printing",
    "CAD",
    "modular storage",
    "design",
    "3D modeling",
    "fabrication",
    "inventor",
  ],
};

export default function Home() {
  return (
    <div id="page">
      <WebContent name="Modular Storage Rack" text="Dr Alexander Paul Cave">
        <Heading text="Project Description">
          <div style={{ height: "8px" }} />
        </Heading>
        <TwoColumnContainer>
          <ColumnText>
            I recently completed my first industrial design project: a modular,
            expandable racking system designed for a popular IKEA bucket
            organiser. This project was developed using Autodesk Inventor and
            fabricated on my 3D printer.
            <div style={{ height: "24px" }} />
            I wanted to explore plastic design for manufacturability, so I set
            out to create a system that uses no fasteners and could be
            mass-produced through conventional injection moulding. One of the
            main challenges was developing a reliable method for joining the two
            plates. After several iterations and tolerance adjustments, I
            settled on a tongue-and-groove connection with an integrated clip
            mechanism to secure the assembly.
            <div style={{ height: "24px" }} />
            The prototypes are printed in ASA, which I’ve found to be both
            stronger than ABS and easier to print with. I’m currently testing
            the system in my workspace and refining the design.
          </ColumnText>
          <ColumnImage
            src={image}
            alt="Storage Rack"
            caption="Figure 1 - Modular Storage Rack"
          />
        </TwoColumnContainer>
        <div style={{ height: "24px" }} />
        <TwoColumnContainer>
          <ColumnImage
            src={inventor}
            alt="Storage Layout"
            caption="Figure 2 - Modular Storage Rack, CAD Layout"
          />

          <ColumnText></ColumnText>
        </TwoColumnContainer>
      </WebContent>
    </div>
  );
}
