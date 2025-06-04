import Link from "next/link";
import {
  WebContent,
  Heading,
  NamedList,
  Entry,
} from "@/components/documents/Page";

import "@/components/documents/Page.css";
import Image from "next/image";

import CubeRender from "@/public/render-cube-1.png";

export default function PageCuda() {
  return (
    <div id="page" className="image-overlay-container">
      <Image
        className="background-image"
        src={CubeRender}
        alt="Acoustic Render of a Cube"
        fill // This makes the image fill the parent div (Next.js Image prop)
        style={{ objectFit: "cover", zIndex: 1 }}
      />
      <div className="overlay-box">
        <h1>Acoustic Visualization Renderer</h1>
        <Heading text="Overview">
          <p>
            This acoustic renderer simulates sound propagation in a 3D space,
            allowing users to visualize how sound waves interact with objects.
            It is designed to be simple and efficient, making it suitable for
            educational purposes and basic acoustic simulations. The renderer
            uses a Kirchhoff integral equation approach to model sound
            propagation, which is a common method in acoustics for calculating
            the sound field around objects.
          </p>
          <p>
            There is an example render above of a cube excited by monopole sound
            source with a plane below the cube that samples the sum of incident
            and reflected sound waves in the near field. The phase of the
            acoustic waves is represented by the color of the surface, where the
            amplitude is visualized by the brightness of the surface. The
            renderer can handle multiple sound sources and objects, allowing for
            complex acoustic scenarios to be simulated. The user can interact
            with the simulation by adjusting parameters such as the position and
            frequency of sound sources, the properties of the objects in the
            scene, and the acoustic properties of the medium.
          </p>
        </Heading>
        <Heading text="Technology Stack">
          <p>
            The acoustic renderer is built using C++ and leverages the Nvidia
            CUDA and Optix frameworks for high-performance computing and
            rendering. Optix provided the collision detection and ray tracing
            capabilities, while CUDA was used for parallel processing of the
            acoustic calculations. This combination allows for efficient
            simulation of sound propagation in complex environments, making it
            possible to visualize acoustic phenomena. A Docker container is
            provided to run the renderer, which can be used on AWS for cost
            effective batch scene rendering.
          </p>
          <p>
            Python scripting is used to generate the scene and sound source
            parameters, allowing for easy customization and automation of the
            rendering process.Target Echo Strength (TES) values can can
            calculated and graphed by providing the location of field points.
          </p>
          <NamedList name="Programming Languages:">
            <li>C++, C, Python</li>
          </NamedList>
          <NamedList name="Framework:">
            <li>Nvidia CUDA and Optix</li>
          </NamedList>
          <NamedList name="Acoustic Model:">
            <li>Discrete Kirchhoff Integral Equation</li>
          </NamedList>
          <NamedList name="Project GitHub Repository:">
            <li>
              <Link
                className="link"
                href="https://github.com/apcave/sonar-render"
                target="_blank"
                rel="noopener noreferrer"
              >
                C++/CUDA Render Github
              </Link>
            </li>
          </NamedList>
        </Heading>
      </div>
    </div>
  );
}
