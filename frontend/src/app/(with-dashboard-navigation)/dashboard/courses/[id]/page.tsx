'use client';

import { Stats } from '@/components/dashboard/Stats';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, ChevronRight, Clock8 } from 'lucide-react';
import { useEffect, useState } from 'react';

type Lesson = {
	id: number;
	title: string;
	desc: string;
	estimated_time: number;
	isDone: boolean;
	detailed_desc: string;
};

type Course = {
	id: number;
	title: string;
	desc: string;
	lessons: Lesson[];
};

type CoursePageParams = {
	id: string;
};

export default function CoursePage({ params }: { params: CoursePageParams }) {
	const [course, setCourse] = useState<Course | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null); 

	useEffect(() => {
		const storedCourses = localStorage.getItem('courses');
		if (storedCourses) {
			const courses: Course[] = JSON.parse(storedCourses);
			const foundCourse = courses.find((course: Course) => course.id === Number(params.id));
			setCourse(foundCourse || null);
		}
	}, [params.id]);

	const handleLessonStatusChange = (lessonId: number, isDone: boolean) => {
		if (!course) return;

		const updatedLessons = course.lessons.map((lesson: Lesson) => {
			if (lesson.id === lessonId) {
				return { ...lesson, isDone: !isDone };
			}
			return lesson;
		});

		const updatedCourse: Course = { ...course, lessons: updatedLessons };

		const storedCourses = localStorage.getItem('courses');
		if (storedCourses) {
			const courses: Course[] = JSON.parse(storedCourses);
			const updatedCourses = courses.map((storedCourse: Course) =>
				storedCourse.id === updatedCourse.id ? updatedCourse : storedCourse,
			);
			localStorage.setItem('courses', JSON.stringify(updatedCourses));
		}

		setCourse(updatedCourse);
	};

	const getEstimatedTotalTime = () => {
		const minutesSum = course?.lessons.reduce((acc: number, currVal: Lesson) => acc + currVal.estimated_time, 0);
		const minutesToHours = minutesSum ? Number((minutesSum / 60).toFixed()) : 0;

		return `~${minutesToHours} ${minutesToHours > 1 ? 'hours' : 'hour'}`;
	};

	const getEstimatedLessonTime = (time: number) => {
		const minutesToHours = time ? Number((time / 60).toFixed()) : 0;

		return `~${minutesToHours} ${minutesToHours > 1 ? 'hours' : 'hour'}`;
	};

	const lessons = course?.lessons;

	const isPreviousLessonDone = (currLessonId: number) => {
		if (currLessonId === 0) return true;
		const previousLesson = lessons ? lessons[currLessonId - 1] : null;
		return previousLesson?.isDone || false;
	};

	const getProgress = () => {
		if (!lessons || lessons.length === 0) return 0;
		const completedLessons = lessons.filter((lesson: Lesson) => lesson.isDone).length;
		return Math.round((completedLessons / lessons.length) * 100);
	};

	const openModal = (lesson: Lesson) => {
		setSelectedLesson(lesson);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedLesson(null);
	};

	if (!course) {
		return <p>Loading course...</p>;
	}

	return (
		<div>
			<section className='flex justify-between pt-40'>
				<article className='basis-1/2 max-w-sm flex flex-col gap-4'>
					<p className='text-gray-600 text-xl font-semibold'>Course</p>
					<h2>{course?.title}</h2>
					<p>{course?.desc}</p>
					<section className='flex justify-between'>
						<div className='flex items-center gap-2'>
							<Clock8 size={16} />
							<span>{getEstimatedTotalTime()}</span>
						</div>
						<div className='flex items-center gap-2'>
							<ChevronRight size={16} />
							<span>
								{lessons?.length} {lessons && lessons.length > 0 ? 'lessons' : 'lesson'}
							</span>
						</div>
					</section>
					<button
						className={`${buttonVariants({
							variant: 'default',
						})} bg-primary text-primary-foreground hover:bg-primary/80 w-fit !font-bold`}>
						Start course <ArrowRight size={16} />
					</button>
				</article>
				<section className='flex items-end'>
					<Stats progress={getProgress()} />
				</section>
			</section>
			<ul className='py-20 flex flex-col gap-8'>
				{lessons?.map(({ id, title, desc, estimated_time, isDone, detailed_desc }: Lesson, index: number) => (
					<li
						style={{
							boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
						}}
						className='border-2 p-4 cursor-pointer rounded-lg border-lime-200'
						key={id}>
						<header>
							<div className='flex gap-4 mb-2'>
								<p className='text-xl font-semibold text-gray-500'>Lesson {index + 1}</p>
								{isDone ? (
									<button
										onClick={() => handleLessonStatusChange(id, isDone)}
										className='bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600 transition'>
										Done
									</button>
								) : isPreviousLessonDone(index) ? (
									<button
										onClick={() => handleLessonStatusChange(id, isDone)}
										className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition'>
										Mark as Done
									</button>
								) : (
									<Badge
										className={`${badgeVariants({
											variant: 'outline',
										})} !bg-transparent border border-black/20`}>
										Locked
									</Badge>
								)}
							</div>
							<h3>{title}</h3>
						</header>
						<p>{desc}</p>
						<div className='flex items-center gap-2'>
							<Clock8 size={16} />
							<span>{getEstimatedLessonTime(estimated_time)}</span>
						</div>

						<button
							onClick={() => openModal({ id, title, desc, estimated_time, isDone, detailed_desc })}
							className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'>
							Show details
						</button>
					</li>
				))}
			</ul>


			{isModalOpen && selectedLesson && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
					<div className='bg-white p-6 rounded-lg max-w-md mx-auto'>
						<h2 className='text-2xl mb-4'>{selectedLesson.title} - Details</h2>
						<p>{selectedLesson.detailed_desc}</p> 
						<div className='flex justify-end mt-6'>
							<button
								onClick={closeModal}
								className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
