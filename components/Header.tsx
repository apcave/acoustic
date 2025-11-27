"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import NavLink from "@/components/NavLink";

import "@/components/Header.css";

interface TabProps {
  link: string;
  title: string;
}

function Tab({ link, title }: TabProps) {
  return (
    <li>
      <NavLink href={link}>{title}</NavLink>
    </li>
  );
}

export default function Header() {
  const { status, data } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isAuth = status === "authenticated";

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const modal = document.getElementById("slide-modal");
      if (modal && !modal.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header id="menu-bar">
      <button
        className="hamburger-menu"
        aria-label="Open menu"
        onClick={() => setOpen(!open)}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            x="6"
            y="8"
            width="20"
            height="2"
            rx="1"
            fill="var(--color-4-primary)"
          />
          <rect
            x="6"
            y="15"
            width="20"
            height="2"
            rx="1"
            fill="var(--color-4-secondary)"
          />
          <rect
            x="6"
            y="22"
            width="20"
            height="2"
            rx="1"
            fill="var(--color-4-secondary)"
          />
        </svg>
      </button>

      <div id="slide-modal" className={open ? "open" : ""}>
        <button
          className="close-button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
        <Link href="/" className="heading">
          Home
        </Link>
        <hr />
        <h1 className="heading">Projects</h1>
        <Link href="/render-cuda/">Acoustic Renderer (C++/CUDA)</Link>
        <Link href="/">Broadband Sonar (STM32, C Bare Metal)</Link>
        <Link href="/bike-lights/">Bike Lights (Nordic, C Zephyr)</Link>
        <Link href="/">BlueTooth Microphone (Nordic, C Zephyr)</Link>
        <Link href="/">Wifi Camera for AI (Espressif, C Zephyr)</Link>
        <Link href="/storage-rack/">Storage Rack (3D Printing / CAD)</Link>
        <hr />
        <h1 className="heading">Acoustic Web Application</h1>
        <Link href="/acoustic/">Instructions</Link>
        <Link href="/acoustic/materials">Materials</Link>
        <Link href="/acoustic/models">Models</Link>

        <hr />
        <h1 className="heading">Code Repositories</h1>

        <a href="https://github.com/apcave/acoustic" target="_blank">
          Acoustic Web Application - JavaScript
        </a>
        <a href="https://github.com/apcave/acoustic-calcs" target="_blank">
          Acoustic Backend - Python / Fortran
        </a>
        <a href="https://github.com/apcave/sonar-render" target="_blank">
          Acoustic Renderer - C++ / CUDA
        </a>
        <a href="https://github.com/apcave">Broadband Sonar - C</a>
        <a href="https://github.com/apcave/bike-lights" target="_blank">
          Bike Lights - C
        </a>
        <a href="https://github.com/apcave">BlueTooth Microphone - C</a>
        <a href="https://github.com/apcave">Wifi Camera for AI - C</a>
        <hr />
        <Link href="/resume" className="heading">
          Alex&apos;s Resume
        </Link>
        <a
          href="https://www.linkedin.com/in/alexander-cave-9b50b427/"
          target="_blank"
        >
          Linked In
        </a>
      </div>

      <div>
        <menu>
          <Tab link="/" title="Home" />
        </menu>
      </div>
      {isAuth && <p>Hello {data.user.name}</p>}
      {isAuth && (
        <button
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Log Out
        </button>
      )}
      {!isAuth && (
        <button
          onClick={() => {
            router.push("/login");
          }}
        >
          Log In
        </button>
      )}
    </header>
  );
}
