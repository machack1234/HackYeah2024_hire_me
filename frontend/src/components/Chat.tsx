/* eslint-disable @next/next/no-img-element */
"use client";

import { useUser } from "@clerk/nextjs";
import { tool, ToolInvocation } from "ai";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Hello! What is your goal?",
      },
    ],
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    messages.map((message) => {
      if (!message.toolInvocations) return;

      message.toolInvocations.map((toolInvocation: ToolInvocation) => {
        if (toolInvocation.result) {
          const existingCourses = JSON.parse(
            localStorage.getItem("courses") || "[]"
          );

          // Add the new toolInvocation.result to the courses array
          const updatedCourses = [...existingCourses, toolInvocation.result];

          // Save updated courses back to localStorage
          localStorage.setItem("courses", JSON.stringify(updatedCourses));

          console.log("Updated courses saved to localStorage:", updatedCourses);
        }
      });
    });
  }, [messages]);

  return (
    <section className="flex pt-header-height flex-col justify-end pb-12 max-w-3xl w-full mx-auto p-4 min-h-screen">
      <ul className="space-y-4 mb-6  w-full overflow-y-auto">
        {messages.map((message) => (
          <li
            key={message.id}
            className={`flex flex-col ${
              message.role === "user" ? "items-end text-right" : "items-start"
            }`}
          >
            {!message.toolInvocations ? (
              <div
                className={`flex items-center ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <img
                  src={
                    message.role === "user"
                      ? user?.imageUrl
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={
                    message.role === "user" ? "User Avatar" : "Assistant Avatar"
                  }
                  className="w-10 h-10 rounded-full mx-3"
                />
                <div
                  className={` px-4 py-2 rounded-lg shadow-md ${
                    message.role === "user"
                      ? "bg-primary/60 text-primary-foreground"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ) : (
              message.toolInvocations?.map((toolInvocation: ToolInvocation) => {
                return (
                  <div
                    key={toolInvocation.toolCallId}
                    className={`flex items-center ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <img
                      src={
                        message.role === "user"
                          ? user?.imageUrl
                          : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt={
                        message.role === "user"
                          ? "User Avatar"
                          : "Assistant Avatar"
                      }
                      className="w-10 h-10 rounded-full mx-3"
                    />
                    <div
                      className={` px-4 py-2 rounded-lg shadow-md ${
                        message.role === "user"
                          ? "bg-primary/60 text-primary-foreground"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      I prepared the learning plan for You. You can find it in
                      "Courses".
                    </div>
                  </div>
                );
              })
            )}
          </li>
        ))}
      </ul>
      <div ref={chatEndRef} />

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center h-full w-full max-w-3xl gap-4"
      >
        <div className="w-full">
          <input
            value={input}
            type="text"
            onChange={handleInputChange}
            className="w-full h-12  p-6 border border-primary-300 rounded-md text-black focus:outline-none focus:ring-2 focus:primary focus:border-transparent"
            placeholder="Type your message..."
          />
        </div>
        <button
          type="submit"
          disabled={!input}
          className="bg-primary  p-4 px-4 rounded-md hover:bg-primary/80 focus:ring-2 focus:ring-indigo-500 cursor-pointer focus:outline-none text-primary-foreground disabled:opacity-50 disabled:cursor-default"
        >
          Send
        </button>
      </form>
    </section>
  );
}
