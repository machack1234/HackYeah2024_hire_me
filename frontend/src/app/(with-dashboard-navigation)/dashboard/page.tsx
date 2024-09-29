"use client";

import Dashboard from "@/components/Dashboard";
import { Stats } from "@/components/dashboard/Stats";
import { buttonVariants } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight, Rocket, Sprout, Zap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div>
      <section className="flex justify-between pt-40">
        <article className="basis-1/2 max-w-sm flex flex-col gap-8">
          <h2>Your learning hub</h2>
          <div className="flex flex-col gap-4">
            <h3>Hi, {user?.fullName}!</h3>
            <p>
              Let’s create your learning plan! Our system will help you identify
              your strengths and highlight areas that will open doors to new
              opportunities.
            </p>
            <Link
              href="/dashboard/start-new-course"
              className={`${buttonVariants({
                variant: "default",
              })} bg-primary text-primary-foreground hover:bg-primary/80 w-fit !font-bold`}
            >
              Get started <ArrowRight size={16} />
            </Link>
          </div>
        </article>
        <section className="flex items-end">
          <Stats />
        </section>
      </section>
    </div>
  );
}
