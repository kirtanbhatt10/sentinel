import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const originalImage = formData.get("originalImage") as File;
    const suspectImage = formData.get("suspectImage") as File;
    const caption = formData.get("caption") as string;

    if (!originalImage || !suspectImage) {
      return NextResponse.json({ error: "Both images required" });
    }

    // 🔹 Convert images to base64
    const originalBytes = await originalImage.arrayBuffer();
    const originalBase64 = Buffer.from(originalBytes).toString("base64");

    const suspectBytes = await suspectImage.arrayBuffer();
    const suspectBase64 = Buffer.from(suspectBytes).toString("base64");

    // 🔹 Model (only valid one)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const promptText = `
You are an AI detecting sports content misuse.

Compare:
1. Original content
2. Suspect content

Caption: "${caption}"

Identify:
- reused elements
- transformations (crop, text, watermark removal)
- classification (fan, meme, piracy, scam, impersonation)
- risk level (Low, Medium, High, Critical)
- reasoning (2 lines)
- recommended action

Respond in JSON:
{
  "reuseDetected": "",
  "transformations": "",
  "classification": "",
  "riskLevel": "",
  "reasoning": "",
  "recommendedAction": ""
}
`;

    // 🔥 Retry logic (CORRECT placement)
    let result: any;
    const maxRetries = 3;

    for (let i = 0; i < maxRetries; i++) {
      try {
        result = await model.generateContent([
          {
            inlineData: {
              mimeType: originalImage.type,
              data: originalBase64,
            },
          },
          {
            inlineData: {
              mimeType: suspectImage.type,
              data: suspectBase64,
            },
          },
          {
            text: promptText,
          },
        ]);

        break; // success
      } catch (err) {
        console.log(`Retry ${i + 1} failed`);

        if (i === maxRetries - 1) throw err;

        await new Promise(res => setTimeout(res, 1000 * (i + 1)));
      }
    }

    const text = result.response.text();

    // 🔥 Clean JSON
    let parsed;
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { raw: text };
    }

    return NextResponse.json(parsed);

  } catch (error) {
    console.error("Gemini error:", error);

    return NextResponse.json({
      error: "Gemini failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}