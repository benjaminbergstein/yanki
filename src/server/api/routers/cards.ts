import { z } from "zod";
import * as hub from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        fluentLanguage: z.string(),
        learningLanguage: z.string(),
        term: z.string(),
        topic: z.string(),
        level: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const prompt = await hub.pull("anki-cards-v1");
      const model = new ChatOpenAI({
        model: "gpt-4o",
        temperature: 0.15,
      });
      const runnable = prompt.pipe(model);
      return (await runnable.invoke(input)) as unknown as Promise<{
        backText: string;
        frontText: string;
        backSentence: string;
        frontSentence: string;
        fluentLangEtymology: string;
        learningLangEtymology: string;
      }>;
    }),
});
