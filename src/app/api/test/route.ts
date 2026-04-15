import { NextResponse } from "next/server";
import { analyzeVariant } from "@/lib/gemini";

export async function GET() {
  const result = await analyzeVariant(
    "FREE TICKETS!!! Click now limited offer"
  );

  return NextResponse.json(result);
}