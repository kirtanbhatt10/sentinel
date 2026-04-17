import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔹 Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 🔹 Use correct model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// 🔹 Helper function (FIXED RETURN TYPE)
async function runPrompt(prompt: string): Promise<string> {
  const maxRetries = 3;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      console.log(`Retry ${i + 1} failed`);

      if (i === maxRetries - 1) throw error;

      await new Promise(res => setTimeout(res, (i + 1) * 1000));
    }
  }

  // 🔥 IMPORTANT: fallback return (TS fix)
  return "";
}

// 🔹 Main function
export async function analyzeVariant(caption: string) {
  try {
    const prompt = `
You are an AI analyzing suspicious sports content.

Caption: "${caption}"

Classify risk and explain.

Respond STRICTLY in JSON:
{
  "riskLevel": "",
  "reasoning": "",
  "recommendedAction": ""
}
`;

    const response = await runPrompt(prompt);

    // 🔥 Safety check
    if (!response) {
      return { error: "Empty response from Gemini" };
    }

    // 🔥 Clean + parse JSON safely
    try {
      const cleaned = response.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      return { raw: response };
    }

  } catch (error) {
    console.error("Gemini error:", error);

    return {
      error: "Gemini failed",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}