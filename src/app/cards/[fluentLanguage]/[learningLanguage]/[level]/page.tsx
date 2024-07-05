import Link from "next/link";
import { api } from "~/trpc/server";

export const maxDuration = 60;

type ParamsType = {
  fluentLanguage: string;
  learningLanguage: string;
  level: string;
};

export default async function Home({ params }: { params: ParamsType }) {
  const categories = await api.card.getCategories({
    fluentLanguage: params.fluentLanguage,
    learningLanguage: params.learningLanguage,
    level: params.level,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <>
        <div className="text-2xl">What interests you?</div>
        <div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/cards/${params.fluentLanguage}/${params.learningLanguage}/${params.level}/${category.slug}`}
              className="text-md flex items-center justify-center rounded-xl bg-black/20 p-3 text-center sm:h-[15vw] sm:w-[15vw] sm:px-4 sm:py-0"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </>
    </main>
  );
}
