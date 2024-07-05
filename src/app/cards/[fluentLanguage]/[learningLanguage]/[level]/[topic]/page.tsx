import Link from "next/link";
import Card from "~/app/_components/Card";
import { api } from "~/trpc/server";

type ParamsType = {
  fluentLanguage: string;
  learningLanguage: string;
  level: string;
  topic: string;
};

export default async function Home({ params }: { params: ParamsType }) {
  // const categories = await api.card.getCategories({
  //   fluentLanguage: params.fluentLanguage,
  //   learningLanguage: params.learningLanguage,
  //   level: params.level,
  // });

  const termsRes = await api.card.categoryTerms({
    fluentLanguage: params.fluentLanguage,
    learningLanguage: params.learningLanguage,
    level: params.level,
    topic: params.topic,
  });
  const terms = termsRes.terms;
  console.log(termsRes);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <>
        <div className="text-2xl">{params.topic}</div>
        <div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row">
          {terms.map((term) => (
            <Link
              key={term}
              href={`/cards/${params.fluentLanguage}/${params.learningLanguage}/${params.level}/${params.topic}/${term}`}
              className="text-md flex items-center justify-center rounded-xl bg-black/20 p-3 text-center sm:h-[15vw] sm:w-[15vw] sm:px-4 sm:py-0"
            >
              {term}
            </Link>
          ))}
        </div>
      </>
    </main>
  );
}
