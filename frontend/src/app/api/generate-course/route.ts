import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();


    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        data: z
          .object({
            subject: z.string(),
              lessons: z.object({
                  content: z.string(),

            })
          })
      }),
      system: "",
      prompt: `Generate the course basing on the context: ${data}`,
    });

    const aiResult = object.data;
    console.log("[Generate-course] Course generated.");

    return NextResponse.json({ answer: aiResult });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
