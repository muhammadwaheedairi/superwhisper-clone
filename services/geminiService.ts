import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const rewriteText = async (text: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure process.env.API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are Superwhisper, an advanced AI voice-to-text assistant. 
      The user has provided a rough transcript or draft. 
      Rewrite the following text to be professional, concise, and clear. 
      Do not add any conversational filler. Just output the rewritten text.
      
      Input text: "${text}"`,
    });
    
    return response.text || "Could not generate a response.";
  } catch (error) {
    console.error("Error rewriting text:", error);
    return "An error occurred while processing your text.";
  }
};