import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const codeString = body.code;

  if (!codeString) {
    return NextResponse.json(
      {
        message: "Necesitas un prompt",
      },
      {
        status: 400,
      }
    );
  }

try {
    // Regular expression to match the object section
  const regex = /openai\.images\.generate\((\{[^]*?\})\)/;

  // Extract the matched object section
  const match = codeString.match(regex);

  if (match && match[1]) {
    // Parse the extracted object section into a JavaScript object
    try {
      const options = eval(`(${match[1]})`);

      // Now 'options' contains the extracted object, and you can use it to execute the OpenAI API

      const response = await openai.images.generate(options);

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

      return NextResponse.json(
        {
          message: "Error en el código",
          status: 400
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "El código no corresponde al correcto",
        status: 400
      },
      { status: 400 }
    );
  }
} catch (error) {
    return NextResponse.json(
      {
        message: "Error en el servidor",
        status: 500
      },
      { status: 500 }
    );
}
}
