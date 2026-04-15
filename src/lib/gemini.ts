import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔹 Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 🔹 Use correct model (IMPORTANT FIX)
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// 🔹 Helper function
async function runPrompt(prompt: string) {
  const maxRetries = 3;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      console.log(`Retry ${i + 1} failed`);

      if (i === maxRetries - 1) throw error;

      // wait before retry (1s, 2s, 3s)
      await new Promise(res => setTimeout(res, (i + 1) * 1000));
    }
  }
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