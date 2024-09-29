import { CHAT_PROMPT } from "@/prompt";
import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import axios from "axios";
import { z } from "zod";

export const maxDuration = 30;

const generateLearningPlan = async (context: string) => {
  try {
    console.log("[CHAT] Executing searchGoogle tool...");
    const learningPlan = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-course`,
      {
        context,
      }
    );

    return await learningPlan.data.answer;
  } catch (error) {
    console.error("Error from searchGoogle tool: ", error);

    return;
  }
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToCoreMessages(messages),
    system: CHAT_PROMPT,
    tools: {
      generateLearningPlan: {
        description:
          "When you get enough information from the user you are executing this tool to generate the structured json with the learning plan",
        parameters: z.object({
          context: z
            .string()
            .describe("The generated learning plan in JSON format"),
        }),
        execute: async ({ context }) => {
          //   console.log(
          //     "Generated Learning Plan JSON:",
          //     JSON.stringify(plan, null, 2)
          //   );
          const learningPlan = await generateLearningPlan(context);
          console.log(
            "Generated Learning Plan JSON:",
            JSON.stringify(learningPlan, null, 2)
          );
          return learningPlan;
        },
      },
    },
  });

  return result.toDataStreamResponse();
}
// import { CHAT_PROMPT } from "@/prompt";
// import { openai } from "@ai-sdk/openai";
// import { streamText, convertToCoreMessages } from "ai";
// import { z } from "zod";

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = await streamText({
//     model: openai("gpt-4"),
//     messages: convertToCoreMessages(messages),
//     system: CHAT_PROMPT,
//     tools: {
//       generateLearningPlan: {
//         description:
//           "This function logs the generated learning plan to the console.",
//         parameters: z.object({
//           plan: z
//             .string()
//             .describe("The generated learning plan in JSON format"),
//         }),
//         execute: async ({ plan }) => {
//           console.log(
//             "Generated Learning Plan JSON:",
//             JSON.stringify(plan, null, 2)
//           );
//           return "I'm preparing your plan";
//         },
//       },
//     },
//   });

//   return result.toDataStreamResponse();
// }
