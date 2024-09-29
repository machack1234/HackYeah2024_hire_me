/* eslint-disable @next/next/no-img-element */
'use client';

import { useUser } from '@clerk/nextjs';
import { ToolInvocation } from 'ai';
import { useChat } from 'ai/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		initialMessages: [
			{
				id: '1',
				role: 'assistant',
				content: 'What type of job or career would you like to transition into?',
			},
		],
	});
	const chatEndRef = useRef<HTMLDivElement>(null);
	const { user } = useUser();
	const [courseGenerated, setCourseGenerated] = useState(false);
	const [loading, setLoading] = useState(false); 
	const [preparingMessageSent, setPreparingMessageSent] = useState(false); 

	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}, [messages]);

	useEffect(() => {
		messages.forEach(message => {
			if (
				message.role === 'assistant' &&
				message.content.includes('I am preparing your plan') &&
				!preparingMessageSent
			) {
				setLoading(true);
				setPreparingMessageSent(true);
			}

			if (!message.toolInvocations) return;

			message.toolInvocations.forEach((toolInvocation: ToolInvocation) => {
				if ('result' in toolInvocation && toolInvocation.result) {
					const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
					const updatedCourses = [...existingCourses, toolInvocation.result];
					localStorage.setItem('courses', JSON.stringify(updatedCourses));

					console.log('Updated courses saved to localStorage:', updatedCourses);
					setLoading(false);
					setCourseGenerated(true);
				}
			});
		});
	}, [messages, preparingMessageSent]);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSubmit(e);
		setPreparingMessageSent(false);
	};

	return (
		<section className='flex pt-header-height  flex-col justify-end pb-12 max-w-3xl w-full mx-auto p-4 min-h-screen'>
			<ul className='space-y-4 mb-6 w-full overflow-y-auto'>
				{messages.map(message => (
					<li
						key={message.id}
						className={`flex flex-col ${message.role === 'user' ? 'items-end text-right' : 'items-start'}`}>
						{!message.toolInvocations ? (
							<div className={`flex items-center ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
								<img
									src={
										message.role === 'user'
											? user?.imageUrl
											: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
									}
									alt={message.role === 'user' ? 'User Avatar' : 'Assistant Avatar'}
									className='w-10 h-10 rounded-full mx-3'
								/>
								<div
									className={`px-4 py-2 rounded-lg shadow-md ${
										message.role === 'user' ? 'bg-primary/60 text-primary-foreground' : 'bg-gray-200 text-black'
									}`}>
									{message.content}
								</div>
							</div>
						) : (
							message.toolInvocations?.map((toolInvocation: ToolInvocation) => {
								return (
									<div
										key={toolInvocation.toolCallId}
										className={`flex items-center ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
										<img
											src={
												message.role === 'user'
													? user?.imageUrl
													: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
											}
											alt={message.role === 'user' ? 'User Avatar' : 'Assistant Avatar'}
											className='w-10 h-10 rounded-full mx-3'
										/>
										<div
											className={`px-4 py-2 rounded-lg shadow-md ${
												message.role === 'user' ? 'bg-primary/60 text-primary-foreground' : 'bg-gray-200 text-black'
											}`}>
											{courseGenerated ? (
												'I prepared the learning plan for You. You can find it in there:'
											) : (
												
													<div>
														<p>Your course is being Generated, stand still..</p>
													{' '}
													<div className='flex justify-center items-center'>
														<svg
															className='animate-spin h-8 w-8 text-primary'
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'>
															<circle
																className='opacity-25'
																cx='12'
																cy='12'
																r='10'
																stroke='currentColor'
																strokeWidth='4'></circle>
															<path
																className='opacity-75'
																fill='currentColor'
																d='M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
														</svg>
													</div>
												</div>
											)}
										</div>
									</div>
								);
							})
						)}
					</li>
				))}
			</ul>
			<div ref={chatEndRef} />

			{courseGenerated ? (
				<Link href='/dashboard/courses'>
					<button className='bg-primary p-4 px-4 rounded-md hover:bg-primary/80 focus:ring-2 focus:ring-indigo-500 cursor-pointer focus:outline-none text-primary-foreground'>
						Go to Courses
					</button>
				</Link>
			) : loading ? (
				<div className='flex justify-center items-center'>
					<svg
						className='animate-spin h-8 w-8 text-primary'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
					</svg>
				</div>
			) : (
				<form
					onSubmit={handleFormSubmit}
					className='flex justify-center items-center h-full w-full max-w-3xl gap-4'>
					<div className='w-full'>
						<input
							value={input}
							type='text'
							onChange={handleInputChange}
							className='w-full h-12 p-6 border border-primary-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
							placeholder='Type your message...'
						/>
					</div>
					<button
						type='submit'
						disabled={!input}
						className='bg-primary p-4 px-4 rounded-md hover:bg-primary/80 focus:ring-2 focus:ring-indigo-500 cursor-pointer focus:outline-none text-primary-foreground disabled:opacity-50 disabled:cursor-default'>
						Send
					</button>
				</form>
			)}
		</section>
	);
}
