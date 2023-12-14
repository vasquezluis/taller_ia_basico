import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const promptString = body.prompt;

try {
    if (!promptString) {
    return NextResponse.json(
      {
        message: "Necesitas un prompt",
      },
      {
        status: 400,
      }
    );
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: body.prompt,
    quality: "standard",
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = response?.data[0].url;
  console.log(imageUrl);

  return NextResponse.json(
    {
      message: "response",
      url: imageUrl,
    },
    { status: 200 }
  );
} catch (error) {
  if(error instanceof Error){
    console.log(error)
  }
  return NextResponse.json(
    {
      message: "Error en el servidor",
      status: 500
    },
    { status: 500 }
  );
}
}
