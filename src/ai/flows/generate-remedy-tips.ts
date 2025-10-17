
// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview This file contains the Genkit flow for generating remedy tips for plant diseases.
 *
 * - generateRemedyTips - A function that generates remedy tips for a given plant disease.
 * - GenerateRemedyTipsInput - The input type for the generateRemedyTips function.
 * - GenerateRemedyTipsOutput - The output type for the generateRemedyTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRemedyTipsInputSchema = z.object({
  disease: z.string().describe('The name of the detected plant disease.'),
});
export type GenerateRemedyTipsInput = z.infer<typeof GenerateRemedyTipsInputSchema>;

const GenerateRemedyTipsOutputSchema = z.object({
  remedyTips: z.string().describe('AI-generated remedies and prevention tips for the detected plant disease.'),
});
export type GenerateRemedyTipsOutput = z.infer<typeof GenerateRemedyTipsOutputSchema>;

export async function generateRemedyTips(input: GenerateRemedyTipsInput): Promise<GenerateRemedyTipsOutput> {
  return generateRemedyTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRemedyTipsPrompt',
  input: {schema: GenerateRemedyTipsInputSchema},
  output: {schema: GenerateRemedyTipsOutputSchema},
  prompt: `You are an expert in plant diseases and their remedies. Provide detailed and practical remedies and prevention tips for the following plant disease: {{{disease}}}.`,
});

const generateRemedyTipsFlow = ai.defineFlow(
  {
    name: 'generateRemedyTipsFlow',
    inputSchema: GenerateRemedyTipsInputSchema,
    outputSchema: GenerateRemedyTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
