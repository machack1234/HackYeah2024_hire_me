'use client';

import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';


type Course = {
	id: number;
	title: string;
	desc: string;
};

export default function CoursesPage() {
	const [courses, setCourses] = useState<Course[]>([]); 

	useEffect(() => {
		const storedCourses = localStorage.getItem('courses');
		if (storedCourses) {
			setCourses(JSON.parse(storedCourses));
		}
	}, []);

	return (
		<div className='flex flex-col gap-20'>
			<section className='flex justify-between pt-40'>
				<article className='basis-1/2 max-w-sm flex flex-col gap-4'>
					<h2>Your courses</h2>
				</article>
			</section>
			<ul className='flex flex-col gap-4'>
				{courses.length > 0 ? (
					courses.map(({ id, title, desc }: Course) => (
						<li
							style={{
								boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
							}}
							className='border-2 p-4 rounded-lg border-lime-200' key={id}>
							<Link href={`/dashboard/courses/${id}`}>
								<h3>{title}</h3>
								<p>{desc}</p>
							</Link>
						</li>
					))
				) : (
					<div className='flex gap-4  flex-col'>
						<p>No courses available.</p>
						<Link
							href={'/dashboard/start-new-course'}
							className={`${buttonVariants({
								variant: 'default',
							})} bg-primary text-primary-foreground hover:bg-primary/80 w-fit !font-bold ml-3`}>
							Create new course <ArrowRight size={16} />
						</Link>
					</div>
				)}
			</ul>
		</div>
	);
}
