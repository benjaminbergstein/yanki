import { z } from "zod";
import * as hub from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type CategoryType = Record<"title" | "subtitle" | "slug", string>;

import { Firestore, Settings } from "@google-cloud/firestore";
type CredentialsType = Settings["credentials"];
const credentials = JSON.parse(
  process.env.GOOGLE_SERVICE_KEY!,
) as CredentialsType;
const firestore = new Firestore({
  projectId: "yanki-428219",
  databaseId: "cache",
  credentials,
});

const db = firestore.collection("cache");

const maxDuration = 24 * 60 * 60 * 7 * 4; // 4 weeks
async function getCached<T>(key: string, fn: () => Promise<T>) {
  const doc = db.doc(key);
  const cached = await doc.get();

  if (cached.exists) {
    const data = cached.data() as { timestamp: number; data: T } | undefined;
    console.log({ key, data });
    if (data && data.timestamp + maxDuration > Date.now()) {
      return data.data;
    }
  }

  const data = await fn();

  await doc.set({
    timestamp: Date.now(),
    data,
  });

  return data;
}

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
      return getCached(
        `getCategories.${input.fluentLanguage}.${input.learningLanguage}.${input.level}`,
        async () => {
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
        },
      );
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
      return getCached(
        `categoryTerms.${input.fluentLanguage}.${input.learningLanguage}.${input.level}.${input.topic}`,
        async () => {
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
            .then(
              (res) =>
                res as unknown as {
                  terms: string[];
                },
            );
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
      return getCached(
        `create.${input.fluentLanguage}.${input.learningLanguage}.${input.level}.${input.topic}.${input.term}`,
        async () => {
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
        },
      );
    }),
});
