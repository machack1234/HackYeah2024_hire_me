import { COURSES } from "@/constants";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-20">
      <section className="flex justify-between pt-40">
        <article className="basis-1/2 max-w-sm flex flex-col gap-4">
          <h2>Your courses</h2>
        </article>
      </section>
      <ul>
        {COURSES.map(({ id, title, desc }) => (
          <li key={id}>
            <Link href={`/dashboard/courses/${id}`}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
