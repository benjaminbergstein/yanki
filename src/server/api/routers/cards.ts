import { z } from "zod";
import * as hub from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type CategoryType = Record<"title" | "subtitle" | "slug", string>;

export const cardRouter = createTRPCRouter({
  getCategories: publicProcedure
    .input(
      z.object({
        fluentLanguage: z.string(),
        learningLanguage: z.string(),
        level: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const prompt = await hub.pull("categories-v2");
      const model = new ChatOpenAI({
        model: "gpt-4o",
        temperature: 0.15,
      });
      const runnable = prompt.pipe(model);
      return await runnable
        .invoke({
          languageCode: input.learningLanguage,
        })
        .then(
          (res) =>
            res as unknown as {
              lc_kwargs: {
                content: string;
              };
            },
        )
        .then((res) => JSON.parse(res.lc_kwargs.content) as CategoryType[]);
    }),
  categoryTerms: publicProcedure
    .input(
      z.object({
        fluentLanguage: z.string(),
        learningLanguage: z.string(),
        level: z.string(),
        topic: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const prompt = await hub.pull("category-terms-v1");

      const model = new ChatOpenAI({
        model: "gpt-4o",
        temperature: 0.15,
      });
      const runnable = prompt.pipe(model);
      return await runnable
        .invoke({
          language: input.learningLanguage,
          topic: input.topic,
        })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then(
          (res) =>
            res as unknown as {
              terms: string[];
            },
        );
    }),
  create: publicProcedure
    .input(
      z.object({
        fluentLanguage: z.string(),
        learningLanguage: z.string(),
        topic: z.string(),
        level: z.string(),
        term: z.string(),
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
