import { buttonVariants } from "@/components/ui/button";
import { FEATURES, TESTIMONIALS } from "@/constants";
import { ArrowRight } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="flex justify-between gap-40 py-20">
        <article className="basis-1/2 flex flex-col gap-8">
          <h2>Changing careers is a big step – with us, it becomes easier</h2>
          <p>
            We will analyze your skills, goals, and preferences to create a
            perfectly tailored career development path.
          </p>
          <Link
            href="/get-started"
            className={`${buttonVariants({
              variant: "default",
            })} bg-primary text-primary-foreground w-fit flex gap-2 !font-bold`}
          >
            Get started <ArrowRight size={16} />
          </Link>
        </article>
        <figure className="basis-1/2">
          <NextImage
            src="/images/hero-image.png"
            width={632}
            height={422}
            alt="A woman with a laptop"
          />
        </figure>
      </header>
      <main className="font-[family-name:var(--font-geist-sans)]">
        <section className="py-20">
          <h3 className="max-w-sm">
            Learn at your own pace with lessons tailored to you
          </h3>
          <ul className="flex py-8 gap-8">
            {TESTIMONIALS.map(({ id, content, author, avatar }) => (
              <li key={id}>
                <p>{content}</p>
                <div>
                  <NextImage
                    src={avatar}
                    width={40}
                    height={40}
                    alt="Testimonial avatar"
                  />
                  <p>{author}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>How it works</h3>
          <ul>
            {FEATURES.map(({ id, title, desc }) => (
              <li key={id}>
                <h4>{title}</h4>
                <p>{desc}</p>
              </li>
            ))}
          </ul>
          <figure />
        </section>
      </main>
    </div>
  );
}
