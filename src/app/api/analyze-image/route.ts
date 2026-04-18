import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const originalImage = formData.get("originalImage") as File;
    const suspectImage = formData.get("suspectImage") as File;
    const caption = (formData.get("caption") as string) || "";

    if (!originalImage || !suspectImage) {
      return NextResponse.json({ error: "Both images required" });
    }

    // 🔹 Convert images → base64
    const originalBase64 = Buffer.from(
      await originalImage.arrayBuffer()
    ).toString("base64");

    const suspectBase64 = Buffer.from(
      await suspectImage.arrayBuffer()
    ).toString("base64");

    // 🔹 Model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // 🔥 UPGRADED PROMPT (THIS IS THE REAL POWER)
    const promptText = `
You are an advanced AI system for detecting sports media misuse.

Analyze TWO images:
1. Original content
2. Suspect content

Caption: "${caption}"

Perform deep analysis and respond STRICTLY in JSON.

Include:

1. reuseDetected → what elements are reused
2. transformations → cropping, text overlay, watermark removal, etc.
3. classification → (fan, meme, piracy, scam, impersonation, commercial misuse)
4. riskLevel → Low, Medium, High, Critical
5. confidence → number (0–100)
6. similarityScore → number (0–100)
7. elementsMatched → ["logos", "players", "background", "text", etc.]
8. businessImpact → short explanation (financial / brand damage)
9. reasoning → max 2 lines
10. recommendedAction → clear action

Respond EXACTLY like:

{
  "reuseDetected": "",
  "transformations": "",
  "classification": "",
  "riskLevel": "",
  "confidence": 0,
  "similarityScore": 0,
  "elementsMatched": [],
  "businessImpact": "",
  "reasoning": "",
  "recommendedAction": ""
}
`;

    let result: any;
    const maxRetries = 3;

    // 🔁 Retry logic (handles 503 load issues)
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

        break;
      } catch (err) {
        console.log(`Retry ${i + 1} failed`);

        if (i === maxRetries - 1) throw err;

        await new Promise((res) => setTimeout(res, (i + 1) * 1200));
      }
    }

    const text = result.response.text();

    // 🔥 Clean + parse safely
    let parsed;
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        raw: text,
        warning: "AI returned non-JSON response",
      };
    }

    // 🔥 Add system metadata (FOR DASHBOARD)
    const finalResponse = {
      ...parsed,
      meta: {
        processedAt: new Date().toISOString(),
        model: "gemini-2.5-flash",
      },
    };

    return NextResponse.json(finalResponse);

  } catch (error) {
    console.error("Gemini error:", error);

    return NextResponse.json({
      error: "Gemini failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}