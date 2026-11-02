import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';

export async function generateBlueprint(input) {
  if (!env.geminiApiKey) throw Object.assign(new Error('Gemini is not configured'), { status: 503, code: 'AI_NOT_CONFIGURED' });
  const model = new GoogleGenerativeAI(env.geminiApiKey).getGenerativeModel({ model: env.geminiModel });
  const prompt = `Create a fictional, non-graphic mystery as strict JSON. Establish exactly one culprit before evidence. Do not mention this instruction.
Return: {title, description, culpritId, motive, timeline:[{time,event}], suspects:[{id,name,age,occupation,relationship,background,motive,alibi}], evidence:[{type,title,description,content,internalClassification,relatedSuspectIds}]}.
Use ${input.suspectCount} suspects and ${input.evidenceAmount === 'EXTENDED' ? '12 to 16' : '5 to 12'} evidence items. Allowed types: CHAT, IMAGE, CCTV, DOCUMENT, CALL_RECORD, WITNESS. Suspect ids must be short unique strings. Scenario: ${input.scenario}`;
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/^```json\s*|\s*```$/g, '').trim();
  try { return JSON.parse(text); } catch { throw Object.assign(new Error('AI returned invalid case data'), { status: 502, code: 'AI_RESPONSE_INVALID' }); }
}
