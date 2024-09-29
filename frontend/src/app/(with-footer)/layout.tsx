import { buttonVariants } from "@/components/ui/button";
import { NAV_ITEMS } from "@/constants";
import NextImage from "next/image";
import Link from "next/link";

export default function LayoutWithFooter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full flex justify-between h-header-height">
        <figure className="flex items-center">
          <Link href="/">
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
            {NAV_ITEMS.map(({ id, label, href }) => (
              <li key={id} className="hover:text-black">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <ul className="flex gap-4">
            <li className="">
              <Link
                href="/sign-in"
                className={`${buttonVariants({
                  variant: "outline",
                })} !border-primary-foreground !font-bold`}
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className={`${buttonVariants({
                  variant: "default",
                })} bg-primary text-primary-foreground hover:bg-primary/80 !font-bold`}
              >
                Get started
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="-mt-header-height">{children}</div>
      <footer className="bg-background-secondary py-24">
        <div className="container mx-auto max-w-7xl">
          <section className="flex justify-between pb-12">
            <section className="flex flex-col gap-8">
              <NextImage
                src="/images/brand-logo.svg"
                alt="AVA logo"
                width={55}
                height={16}
              />
              <address>
                <p className="font-bold">Kontakt:</p>
                <Link href="mailto:support@gethired.com">
                  support@gethired.com
                </Link>
              </address>
            </section>
            <nav>
              <ul className="flex flex-col gap-4 font-bold md:flex-row">
                {NAV_ITEMS.map(({ id, label, href }) => (
                  <li key={id}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <div className="divider divider-accent" />
          <section className="flex flex-col justify-between gap-6 md:flex-row">
            <p className="text-center md:text-left">
              © 2024 Upskill. All rights reserved.
            </p>
            <ul className="flex gap-4 text-[14px] underline">
              <li>
                <Link href="/">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/">Terms of Service</Link>
              </li>
              <li>
                <Link href="/">Cookies Settings</Link>
              </li>
            </ul>
          </section>
        </div>
      </footer>
    </>
  );
}
