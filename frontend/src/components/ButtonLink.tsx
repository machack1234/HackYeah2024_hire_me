import Link from "next/link";
import React from "react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
};
export const ButtonLink = ({ href, children, variant }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`px-4 py-3 rounded-md text-sm font-bold cursor-pointer ${
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : variant === "outline"
          ? ""
          : ""
      }`}
    >
      {children}
    </Link>
  );
};
