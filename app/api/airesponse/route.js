const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req) {
  const { Question, Unformat } = await req.json();
  const UnformattedAns = JSON.parse(Unformat);
  let AllUnformattedAns = "";
  UnformattedAns &&
    UnformattedAns.map((item) => {
      AllUnformattedAns = AllUnformattedAns + item.pageContent;
    });

  const PROMT =
    "For question : " +
    Question +
    "and with the  given contenet as the answerer" +
    "please  give appropriate answer inteh HTML tag format just  complete th  sentense in meaningful words . The answer content is  " +
    AllUnformattedAns;

   const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(PROMT);
  const response = await result.response.text();
  return NextResponse.json({ message: response });
}
