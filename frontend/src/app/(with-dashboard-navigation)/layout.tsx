'use client'
import { buttonVariants } from '@/components/ui/button';
import { NAV_ITEMS_DASHBOARD } from '@/constants';
import { UserButton } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

export default function LayoutWithDashboardNavigation({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname(); 

	return (
		<>
			<header className='w-full flex justify-between h-header-height relative z-50 bg-white'>
				<figure className='flex items-center'>
					<Link href='/dashboard'>
						<NextImage
							src='/images/brand-logo.svg'
							width={132}
							height={32}
							alt='get_hired logo'
						/>
					</Link>
					<h1 className='sr-only'>get_hired</h1>
				</figure>
				<nav className='flex gap-8 justify-between items-center'>
					<ul className='flex gap-4 items-center'>
						{NAV_ITEMS_DASHBOARD.map(({ id, label, href }) => (
							<li
								key={id}
								className={`hover:text-black ${pathname === href ? 'bg-primary p-1 rounded-lg font-bold' : 'text-gray-500'}`}>
								{' '}

								<Link href={href}>{label}</Link>
							</li>
						))}
						<li>
							<Link
								href={'/dashboard/start-new-course'}
								className={`${buttonVariants({
									variant: 'default',
								})} bg-primary text-primary-foreground hover:bg-primary/80 w-fit !font-bold`}>
								Create new course <ArrowRight size={16} />
							</Link>
						</li>
					</ul>
					<UserButton />
				</nav>
			</header>
			<div className='-mt-header-height'>{children}</div>
		</>
	);
}
