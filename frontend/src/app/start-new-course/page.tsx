"use client";

import { useChat } from "ai/react";

export default function StartNewCoursePage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section className="flex h-dvh flex-col items-center justify-center">
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.role}: {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={input} type="text" onChange={handleInputChange} />
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
