"use client";

import { COURSES } from "@/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);
  return (
    <div className="flex flex-col gap-20">
      <section className="flex justify-between pt-40">
        <article className="basis-1/2 max-w-sm flex flex-col gap-4">
          <h2>Your courses</h2>
        </article>
      </section>
      <ul>
        {courses.length > 0 ? (
          courses.map(({ id, title, desc }) => (
            <li key={id}>
              <Link href={`/dashboard/courses/${id}`}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </ul>
    </div>
  );
}
