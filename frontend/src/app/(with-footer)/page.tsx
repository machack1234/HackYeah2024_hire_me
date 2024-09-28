'use client';

import { buttonVariants } from '@/components/ui/button';
import { FEATURES, TESTIMONIALS } from '@/constants';
import { UserButton, useUser } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import from next/navigation in App Router

import { useEffect } from 'react';

export default function Home() {
	const { isLoaded, isSignedIn } = useUser(); // Clerk's user hook to check login status
	const router = useRouter();

	// Redirect if the user is signed in
	useEffect(() => {
		if (isLoaded && isSignedIn) {
			router.push('/dashboard');
		}
	}, [isLoaded, isSignedIn, router]);

	return (
		<div>
			<header className='flex justify-between gap-40 pb-20 pt-40'>
				<article className='basis-1/2 flex flex-col gap-8'>
					<h2>Changing careers is a big step – with us, it becomes easier</h2>
					<p>
						We will analyze your skills, goals, and preferences to create a perfectly tailored career development path.
					</p>
					<Link
						href='/start-new-course'
						className={`${buttonVariants({
							variant: 'default',
						})} bg-primary text-primary-foreground hover:bg-primary/80 w-fit !font-bold`}>
						Get started <ArrowRight size={16} />
					</Link>
					<UserButton />
				</article>
				<figure className='basis-1/2'>
					<NextImage
						src='/images/hero-image.png'
						width={632}
						height={422}
						alt='A woman with a laptop'
					/>
				</figure>
			</header>
			<main className='font-[family-name:var(--font-geist-sans)]'>
				<section className='py-20'>
					<h3 className='max-w-sm'>Learn at your own pace with lessons tailored to you</h3>
					<ul className='flex py-8 gap-8'>
						{TESTIMONIALS.map(({ id, content, author, avatar }) => (
							<li
								key={id}
								className='flex flex-col gap-6 text-sm'>
								<p className='italic'>{content}</p>
								<div className='flex items-center gap-4'>
									<NextImage
										src={avatar}
										width={40}
										height={40}
										alt='Testimonial avatar'
									/>
									<p>{author}</p>
								</div>
							</li>
						))}
					</ul>
				</section>
				<section className='flex gap-40 justify-between'>
					<article className='basis-1/2'>
						<h3 className='mb-8'>How it works</h3>
						<ul className='flex flex-col gap-6'>
							{FEATURES.map(({ id, title, desc }) => (
								<li
									key={id}
									className='flex flex-col gap-4'>
									<h4>{title}</h4>
									<p>{desc}</p>
								</li>
							))}
						</ul>
					</article>
					<figure className='basis-1/2 relative'>
						<NextImage
							src='/images/features.png'
							alt='Features'
							fill
							className='h-full w-full object-contain'
						/>
					</figure>
				</section>
			</main>
		</div>
	);
}
