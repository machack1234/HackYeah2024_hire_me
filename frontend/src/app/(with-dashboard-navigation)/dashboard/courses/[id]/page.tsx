"use client";

import { Stats } from "@/components/dashboard/Stats";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, ChevronRight, Clock8 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CoursePage({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const [course, setCourse] = useState<any | null>(null);

  // Fetch courses from localStorage and find the specific course by ID
  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      const courses = JSON.parse(storedCourses);
      const foundCourse = courses.find(
        (course: any) => course.id === Number(params.id)
      );
      setCourse(foundCourse);
    }
  }, [params.id]);

  // Update the lesson's isDone status in the course
  const handleLessonStatusChange = (lessonId: number, isDone: boolean) => {
    if (!course) return;

    const updatedLessons = course.lessons.map((lesson: any) => {
      if (lesson.id === lessonId) {
        return { ...lesson, isDone: !isDone }; // Toggle the isDone status
      }
      return lesson;
    });

    const updatedCourse = { ...course, lessons: updatedLessons };

    // Save the updated course in the localStorage
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      const courses = JSON.parse(storedCourses);
      const updatedCourses = courses.map((storedCourse: any) =>
        storedCourse.id === updatedCourse.id ? updatedCourse : storedCourse
      );
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }

    // Update the local state with the new course data
    setCourse(updatedCourse);
  };

  // Calculate the total estimated time for the course
  const getEstimatedTotalTime = () => {
    const minutesSum = course?.lessons.reduce(
      (acc: number, currVal: any) => acc + currVal.estimated_time,
      0
    );
    const minutesToHours = minutesSum ? Number((minutesSum / 60).toFixed()) : 0;

    return `~${minutesToHours} ${minutesToHours > 1 ? "hours" : "hour"}`;
  };

  // Calculate the estimated time for each lesson
  const getEstimatedLessonTime = (time: number) => {
    const minutesToHours = time ? Number((time / 60).toFixed()) : 0;

    return `~${minutesToHours} ${minutesToHours > 1 ? "hours" : "hour"}`;
  };

  const lessons = course?.lessons;

  // Check if the previous lesson is done
  const isPreviousLessonDone = (currLessonId: number) => {
    // First lesson should not be locked
    if (currLessonId === 0) return true;

    // Check if the previous lesson is done
    const previousLesson = lessons[currLessonId - 1];
    return previousLesson?.isDone;
  };

  // Calculate progress
  const getProgress = () => {
    if (!lessons || lessons.length === 0) return 0;

    const completedLessons = lessons.filter(
      (lesson: any) => lesson.isDone
    ).length;
    return Math.round((completedLessons / lessons.length) * 100);
  };

  if (!course) {
    return <p>Loading course...</p>; // Loading state while the course is fetched
  }

  return (
    <div>
      <section className="flex justify-between pt-40">
        <article className="basis-1/2 max-w-sm flex flex-col gap-4">
          <p className="text-gray-600 text-xl font-semibold">Course</p>
          <h2>{course?.title}</h2>
          <p>{course?.desc}</p>
          <section className="flex justify-between">
            <div className="flex items-center gap-2">
              <Clock8 size={16} />
              <span>{getEstimatedTotalTime()}</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight size={16} />
              <span>
                {lessons?.length}{" "}
                {lessons && lessons?.length > 0 ? "lessons" : "lesson"}
              </span>
            </div>
          </section>
          <Link
            href="/start-new-course"
            className={`${buttonVariants({
              variant: "default",
            })} bg-primary text-primary-foreground hover:bg-primary/80 w-fit !font-bold`}
          >
            Start course <ArrowRight size={16} />
          </Link>
        </article>
        <section className="flex items-end">
          <Stats progress={getProgress()} />
        </section>
      </section>
      <ul className="py-20 flex flex-col gap-8">
        {lessons?.map(
          ({ id, title, desc, estimated_time, isDone }: any, index: number) => (
            <li key={id} className="flex flex-col gap-2">
              <header>
                <div className="flex gap-4 mb-2">
                  <p className="text-xl font-semibold text-gray-500">
                    Lesson {index + 1}
                  </p>
                  {isDone ? (
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => handleLessonStatusChange(id, isDone)}
                    />
                  ) : isPreviousLessonDone(index) ? (
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => handleLessonStatusChange(id, isDone)}
                    />
                  ) : (
                    <Badge
                      className={`${badgeVariants({
                        variant: "outline",
                      })} !bg-transparent border border-black/20`}
                    >
                      Locked
                    </Badge>
                  )}
                </div>
                <h3>{title}</h3>
              </header>
              <p>{desc}</p>
              <div className="flex items-center gap-2">
                <Clock8 size={16} />
                <span>{getEstimatedLessonTime(estimated_time)}</span>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
