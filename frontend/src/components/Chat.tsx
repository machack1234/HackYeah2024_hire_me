'use client';

import { useChat } from 'ai/react';

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();

	return (
		<section className='flex  flex-col items-center justify-center bg-gray-100 p-4'>
			<ul className='space-y-4 mb-6 max-w-lg w-full'>
				{messages.map(message => (
					<li
						key={message.id}
						className={`flex flex-col ${message.role === 'user' ? 'items-end text-right' : 'items-start'}`}>
						<div
							className={`chat-bubble px-4 py-2 rounded-lg shadow-md ${
								message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-black'
							}`}>
							{message.role}: {message.content}
						</div>
					</li>
				))}
			</ul>

			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center w-full max-w-lg space-y-4'>
				<div className='w-full'>
					<input
						value={input}
						type='text'
						onChange={handleInputChange}
						className='w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
						placeholder='Type your message...'
					/>
				</div>
				<button
					type='submit'
					className='bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
					disabled={!input.length}>
					Send
				</button>
			</form>
		</section>
	);
}
