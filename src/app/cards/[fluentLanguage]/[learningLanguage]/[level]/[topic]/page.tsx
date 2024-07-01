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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <>
        <div className="text-2xl">{params.topic}</div>
        <div className="flex flex-wrap gap-4">
          {terms.map((term) => (
            <Link
              key={term}
              href={`/cards/${params.fluentLanguage}/${params.learningLanguage}/${params.level}/${params.topic}/${term}`}
              className="text-md flex h-[15vw] w-[15vw] items-center justify-center rounded-xl bg-black/20 text-center"
            >
              {term}
            </Link>
          ))}
        </div>
      </>
    </main>
  );
}
