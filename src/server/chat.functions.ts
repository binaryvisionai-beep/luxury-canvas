import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export const sendChat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { messages: Msg[] })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are Shivers Assistant, a warm, concierge-style AI for Shivers — a luxury hospitality destination in North Goa offering premium rooms, fine dining at Shivers Garden Restaurant, and unforgettable events. Help guests with rooms, dining, events, location, and general questions. Keep replies concise, friendly, and elegant.",
          },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) return { error: "Too many requests. Please try again in a moment." };
      if (res.status === 402) return { error: "AI credits exhausted. Please add credits in workspace settings." };
      return { error: "Assistant is unavailable right now." };
    }
    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
