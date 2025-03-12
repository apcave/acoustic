"use client";

// This component is used to keep the amount of client-side code to a minimum.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href; // Use exact match

  return (
    <div className="nav-link">
      <Link href={href} className={isActive ? "active" : undefined}>
        {children}
      </Link>
      {isActive && (
        <motion.div
          className="underline"
          layoutId="underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "-2px",
            left: 0,
            right: 0,
            height: "3px",
            backgroundColor: "#2391d4", // Adjust color as needed
            borderRadius: "3px",
            transformOrigin: "left",
          }}
        />
      )}
    </div>
  );
}
