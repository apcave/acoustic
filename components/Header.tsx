"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

  const isAuth = status === "authenticated";

  return (
    <header id="menu-bar">
      <div>
        <menu>
          <Tab link="/" title="Home" />
          <Tab link="/acoustic/materials" title="Materials" />
          <Tab link="/acoustic/models" title="Models" />
          <Tab link="/resume" title="Alex's Resume" />
          <li>
            <Link
              href="https://github.com/apcave/acoustic"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </li>
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
