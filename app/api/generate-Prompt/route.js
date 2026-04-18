import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { idea } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Generate ONE unique, detailed AI image prompt about: ${idea}. Make it creative, vivid, and different every time.
      Rules:
- Output ONLY the prompt
- No explanation
- No labels like "Prompt:"
- No headings, no formatting
- Single prompt only
      `,
    });

    const text = response.text;
    return NextResponse.json({ prompt: text });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Prompt generation failed" },
      { status: 500 }
    );
  }
}