"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import {
  Page,
  p,
  Heading,
  NamedList,
  Entry,
} from "@/components/documents/Page";

export default function AlexCV() {
  const [page, setPage] = useState(1);

  function pageSelected(selPage) {
    console.log("Page selected:", page);
    if (page !== selPage) {
      setPage(selPage);
    }
  }

  let content;
  if (page === 1) {
    content = (
      <AlexCVpg1 numPages={2} pageNum={1} handlePageSelect={pageSelected} />
    );
  }

  if (page === 2) {
    content = (
      <AlexCVpg2 numPages={2} pageNum={2} handlePageSelect={pageSelected} />
    );
  }

  return <AnimatePresence>{content}</AnimatePresence>;
}

function AlexCVpg1({ numPages, pageNum, handlePageSelect }) {
  return (
    <Page
      name="Dr Alexander Cave"
      text="Software Developer | Embedded Systems | Full-Stack Developer"
      numPages={numPages}
      pageNum={pageNum}
      onPageSelect={handlePageSelect}
    >
      <Heading text="Objective">
        <p>
          Experienced software developer with expertise in embedded systems,
          backend development, and full-stack development. Proficient in C++,
          Python, and JavaScript, with a track record of delivering
          high-performance solutions. Currently enhancing skills through
          advanced certifications, seeking a challenging role in a dynamic
          environment to contribute technical expertise and innovative
          problem-solving.
        </p>
      </Heading>
      <Heading text="Skills and Technology">
        <NamedList name="Programming Languages:">
          <li>C++, C, C#, Python, Fortran, JavaScript</li>
        </NamedList>
        <NamedList name="Web Development:">
          <li>HTML, CSS, React.js, Node.js, Django, REST APIs</li>
        </NamedList>
        <NamedList name="Embedded Development:">
          <li>Cross-compiling with GNU, Bare-metal Programming</li>
          <li>
            Linux Device Drivers, Real-Time Operating Systems (RTOS), Debian
            Builds
          </li>
        </NamedList>
        <NamedList name="Tools and Platforms:">
          <li>Git, Docker, Linux, AWS, Azure, CI/CD (GitHub Actions)</li>
        </NamedList>
        <NamedList name="Software Development and Methodologies:">
          <li>Object-Oriented Programming (OOP), Functional Programming</li>
          <li>Agile, Scrum, Waterfall, Test-Driven Development (TDD)</li>
        </NamedList>
        <NamedList name="Other Technologies and Interests:">
          <li>
            Embedded Systems, IoT, Robotics, Machine Learning, Data Science
          </li>
          <li>
            PCB Design, Circuit Prototyping, Microcontrollers (STM32), Raspberry
            Pi
          </li>
          <li>3D Printing and CAD (Autodesk Inventor)</li>
        </NamedList>
      </Heading>
      <Heading text="Work Experience">
        <Entry
          title="Python Developer"
          leftText="Tohen Holdings"
          rightText="March 2022-Present"
        >
          <p>
            Designed and optimised algorithmic trading systems for a fintech
            startup, improving backtesting efficiency and execution latency.
            Designed and optimized trading strategies, API consumption, data
            management, and reporting in Python, leveraging scientific libraries
            for analytics and performance tuning.
          </p>
        </Entry>

        <Entry
          title="Backend C++ Developer"
          leftText="Industrial Science Group"
          rightText="March 2021 - March 2022"
        >
          <p>
            Developed C++ backend code as a subcontractor for Geoscience
            Australia, contributing to an initiative that enhanced the
            resolution of GPS and GNSS device positioning. Implemented satellite
            tracking using base-station signal correction data, which was
            published as a backend web service deployed on AWS, utilizing EC2
            instances and Kubernetes for scalability and reliability.
          </p>
        </Entry>

        <Entry
          title="Embedded Engineer"
          leftText="Lode Star"
          rightText="November 2017 - March 2021"
        >
          <p>
            Developed embedded software and hardware interfaces for a prototype
            active sonar system, working with microcontrollers and
            System-on-Chip (SoC) solutions. Implemented signal processing
            algorithms to calculate target position and size. Wrote Linux device
            drivers in C and developed bare-metal firmware for
            STMicrocontrollers. Configured Debian OS and contributed to
            high-level computational code in Python.
          </p>
        </Entry>
      </Heading>
    </Page>
  );
}

export function AlexCVpg2({ numPages, pageNum, handlePageSelect }) {
  return (
    <Page
      name="Dr Alexander Cave"
      text="Software Developer | Embedded Systems | Full-Stack Developer"
      numPages={numPages}
      pageNum={pageNum}
      onPageSelect={handlePageSelect}
    >
      <Heading text="Work Experience (continued):">
        <Entry
          title="Computation Physicist"
          leftText="Department of Defence"
          rightText="Feburary 2010 - November 2017"
        >
          <p>
            Developed analysis and technology for sonar stealth optimization of
            Royal Australian Navy submarines. Designed and implemented
            High-Performance Computing (HPC) solutions to model underwater
            acoustic reflections from sound-attenuating tiles and large
            submerged objects. Conducted statistical analysis of experimental
            data to classify material acoustic properties. Key technologies
            included CUDA C++, MATLAB, and Fortran.
          </p>
        </Entry>

        <Entry
          title="Full Stack Developer"
          leftText="Department of Defence"
          rightText="April 2005 - Feburary 2010"
        >
          <p>
            Developed a distributed, web-enabled reliability analysis tool for
            asset management in the Royal Australian Navy (RAN). Collaborated
            within a cross-functional team, contributing to both software
            development and the mathematical modeling of highly complex
            problems. Key technologies included C++, C#, and MATLAB, implemented
            within a distributed system architecture. Frontend in ASPX, HTML,
            CSS and Silverlight.
          </p>
        </Entry>
      </Heading>

      <Heading text="Education:">
        <Entry
          title="Doctrate in Engineering"
          leftText="Deakin University"
          rightText="Completed 2005"
        >
          <p>
            Conducted research on the application of Artificial Intelligence to
            optimise logistics and manufacturing operations. Enhanced the scope
            of operations research by integrating search techniques and Monte
            Carlo simulation to solve complex problems. Applied advanced
            statistical methods for performance evaluation and stochastic
            modelling, improving decision-making processes in dynamic
            environments.
          </p>
        </Entry>

        <Entry
          title="Bachelor of Engineering in Mechatronics"
          leftText="Deakin University"
          rightText="Completed 2001"
        >
          <p>
            My Mechatronics Engineering degree provided a multidisciplinary
            foundation in mechanics, materials, electrical and electronics
            engineering, control systems, and low-level programming. This
            expanded my expertise in mechanical design to include
            microcontrollers and electronics. I further specialised by selecting
            advanced electives in mechanical vibration and signal processing,
            leveraging their mathematical overlap with core control subjects.
          </p>
        </Entry>
      </Heading>

      <Heading text="Certifications:">
        <Entry
          title="AWS Cloud Quest: Cloud Practitioner"
          leftText="Amazon"
          rightText="January 2025"
        />
        <Entry
          title="PCEP – Certified Entry-Level Python Programmer"
          leftText="Python Institute"
          rightText="January 2025"
        />
        <Entry
          title="Build a Backend REST API with Python & Django - Advanced"
          leftText="Udemy"
          rightText="February 2025"
        />
      </Heading>

      <Heading text="Awards and Achievements:">
        <Entry
          title="Divisional Award for Best Technical Contribution"
          leftText="Department of Defence"
          rightText="2013"
        />
        <Entry
          title="SensAble Developer Challenge"
          leftText="Haptics Symposium"
          rightText="2005"
        />
        <Entry
          title="Dean's Commendation"
          leftText="Faculty of Science and Technology, Deakin University"
          rightText="1998"
        />
        <Entry
          title="Life Membership"
          leftText="Golden Key International Honour Society"
          rightText="1998"
        />
      </Heading>
    </Page>
  );
}
