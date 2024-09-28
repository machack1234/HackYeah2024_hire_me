import Link from "next/link";

import { Button } from "@/components/ui/button";

type ButtonAsChildProps = {
  href: string;
  label: string;
  variant?: string;
};

export function ButtonAsChild({ href, label, variant }: ButtonAsChildProps) {
  return (
    <Button asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
