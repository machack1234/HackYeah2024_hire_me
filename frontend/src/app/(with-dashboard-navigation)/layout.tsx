import { NAV_ITEMS_DASHBOARD } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import NextImage from "next/image";
import Link from "next/link";

export default function LayoutWithDashboardNavigation({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full flex justify-between h-header-height relative z-50 bg-white">
        <figure className="flex items-center">
          <Link href="/dashboard">
            <NextImage
              src="/images/brand-logo.svg"
              width={132}
              height={32}
              alt="get_hired logo"
            />
          </Link>
          <h1 className="sr-only">get_hired</h1>
        </figure>
        <nav className="flex gap-8 justify-between items-center">
          <ul className="flex gap-4">
            {NAV_ITEMS_DASHBOARD.map(({ id, label, href }) => (
              <li key={id} className="hover:text-black">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <UserButton />
        </nav>
      </header>
      <div className="-mt-header-height">{children}</div>
    </>
  );
}
