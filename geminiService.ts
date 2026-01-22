
import { GoogleGenAI, Type } from "@google/genai";
import { AsnafCategory } from "./types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const classifyAsnaf = async (
  fullName: string,
  householdSize: number,
  monthlyIncome: number,
  hardshipDescription: string
) => {
  const ai = getAI();
  const prompt = `
    Analyze the following Zakat applicant data and categorize them into one of the 8 Shariah-approved categories: 
    Fakir, Miskin, Amil, Muallaf, Riqab, Gharimin, Fisabilillah, Ibnu Sabil.

    Applicant Info:
    - Name: ${fullName}
    - Household Size: ${householdSize}
    - Monthly Income: ${monthlyIncome}
    - Hardship Description: "${hardshipDescription}"

    Rules:
    - Fakir: Extremely poor, no means of livelihood.
    - Miskin: Living below poverty line, basic needs not fully met.
    - Gharimin: People in debt for essentials.
    - Fisabilillah: Those in the path of Allah (education, community work).
    - Ibnu Sabil: Wayfarers/Travelers in need.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          predictedCategory: { type: Type.STRING, description: "One of the 8 Asnaf categories" },
          confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" },
          keyFactors: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Key reasons for this classification"
          },
        },
        required: ["predictedCategory", "confidence", "keyFactors"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const chatWithZakatExpert = async (message: string, history: { role: string, parts: any[] }[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are ZakatConnect AI, a knowledgeable Shariah-compliant zakat expert. Answer questions about Zakat rules, calculations, and the 8 Asnaf categories with kindness and accuracy.',
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
