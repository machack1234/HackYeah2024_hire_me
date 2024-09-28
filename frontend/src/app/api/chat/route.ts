import { CHAT_PROMPT } from '@/prompt';
import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;


export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = await streamText({
		model: openai('gpt-4'),
		messages: convertToCoreMessages(messages),
		system: CHAT_PROMPT,
		tools: {
			generateLearningPlan: {
				description: 'This function logs the generated learning plan to the console.',
				parameters: z.object({
					plan: z.string().describe('The generated learning plan in JSON format'),
				}),
				execute: async ({ plan }) => {

					console.log('Generated Learning Plan JSON:', JSON.stringify(plan, null, 2));
					return "I'm preparing your plan";
				},
			},
		},
	});

	return result.toDataStreamResponse();
}
