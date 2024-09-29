import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

const generateRandomId = () => {
	return Math.floor(Math.random() * 1000000);
};

export async function POST(req: NextRequest) {
	console.log('[Generate-course] Generating the course...');
	try {
		const { context } = await req.json();

		const { object } = await generateObject({
			model: openai('gpt-4o-mini'),
			schema: z.object({
				data: z.object({
					id: z.number(),
					title: z.string(),
					desc: z.string(),
					lessons: z
						.object({
							id: z.number(),
							title: z.string(),
							desc: z.string(),
							detailed_desc: z.string(), // Dodajemy dokładniejszy opis
							estimated_time: z.number().describe('estimated time in minutes'),
							isDone: z.boolean(),
						})
						.array(),
				}),
			}),
			system: 'Generate the course based on the provided context.',
			prompt: `Context: ${context}\n
              For each lesson in the course, generate a title, short description, and a detailed explanation of the task. Include estimated time for each lesson in minutes and indicate if the lesson is completed (isDone as false).`,
		});

		const aiResult = object.data;
		aiResult.id = generateRandomId();

		console.log('[Generate-course] Course generated.');

		return NextResponse.json({ answer: aiResult });
	} catch (error) {
		console.error('Error: ', error);
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
	}
}
