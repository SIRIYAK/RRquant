
import { GoogleGenAI, Type } from "@google/genai";
import { RiskReversalData, MarketIndex, InsightReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMarketInsights = async (
  index: MarketIndex,
  data: RiskReversalData[]
): Promise<InsightReport> => {
  const recentData = data.slice(-5).map(d => `Date: ${d.date}, RR: ${d.riskReversal}, Price: ${d.indexPrice}`).join('\n');
  
  const prompt = `
    As a senior Indian Quantitative Derivatives Strategist, analyze the following 25 Delta Risk Reversal data for ${index}.
    Risk Reversal = (Put IV - Call IV). 
    A higher positive value indicates increased hedging demand and bearish sentiment. 
    A negative or falling value indicates bullish/greed sentiment.

    Recent 5-session Data:
    ${recentData}

    Provide a concise technical report including:
    1. A catchy title.
    2. Summary of sentiment shift.
    3. Outlook (Bullish, Neutral, or Bearish).
    4. Key psychological or technical levels to watch.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            outlook: { type: Type.STRING, enum: ["Bullish", "Neutral", "Bearish"] },
            keyLevels: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "summary", "outlook", "keyLevels"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      title: `${index} Market Update`,
      summary: "Volatility remains stable. Risk reversal indicates balanced hedging activity across strikes.",
      outlook: "Neutral",
      keyLevels: ["Support: Immediate Low", "Resistance: Current High"]
    };
  }
};
