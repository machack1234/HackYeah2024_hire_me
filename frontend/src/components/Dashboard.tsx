'use client';
import { WEEK_PLAN } from '@/constants/week';
import React, { useState } from 'react';

type WeekPlanType = {
	[key: string]: {
		Task: string;
		'Day description'?: string; // Dostosowanie do istniejącej struktury
		'Estimated time to complete'?: string;
		dayDescription?: string;
		estimatedTime?: string;
	};
};

export default function Dashboard() {
	const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});

	const handleTaskCompletion = (day: string) => {
		setCompletedTasks(prevCompleted => ({
			...prevCompleted,
			[day]: !prevCompleted[day],
		}));
	};

	return (
		<div className='p-5 bg-gray-900 text-white min-h-screen'>
			<h1 className='text-2xl font-bold mb-6'>Weekly Learning Plan</h1>
			<ul className='space-y-4'>
				{Object.keys(WEEK_PLAN).map(day => {
					const task = (WEEK_PLAN as WeekPlanType)[day]; // Rzutowanie na poprawny typ
					const isCompleted = completedTasks[day];

					return (
						<li
							key={day}
							className={`flex items-center p-4 rounded-lg bg-gray-800 shadow-md transition ${
								isCompleted ? 'line-through text-gray-500' : 'text-white'
							}`}>
							<input
								type='checkbox'
								checked={isCompleted || false}
								onChange={() => handleTaskCompletion(day)}
								className='mr-4 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-opacity-50'
							/>
							<div>
								<strong className='mr-2'>{day}:</strong>
								<span>
									{task.Task} - {task['Day description'] || task.dayDescription}
								</span>
								<span className='text-sm text-gray-400'>
									({task['Estimated time to complete'] || task.estimatedTime})
								</span>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
