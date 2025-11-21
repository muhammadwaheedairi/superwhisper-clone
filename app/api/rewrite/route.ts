import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: "API Key is missing. Please configure process.env.API_KEY." },
      { status: 500 }
    );
  }

  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are Superwhisper, an advanced AI voice-to-text assistant. 
      The user has provided a rough transcript or draft. 
      Rewrite the following text to be professional, concise, and clear. 
      Do not add any conversational filler. Just output the rewritten text.
      
      Input text: "${text}"`,
    });
    
    const rewrittenText = response.text || "Could not generate a response.";
    
    return NextResponse.json({ text: rewrittenText });
  } catch (error) {
    console.error("Error rewriting text:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your text." },
      { status: 500 }
    );
  }
}