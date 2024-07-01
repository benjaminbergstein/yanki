import Link from "next/link";
import Card from "~/app/_components/Card";
import { api } from "~/trpc/server";

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <>
        <div className="text-2xl">What interests you?</div>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/cards/${params.fluentLanguage}/${params.learningLanguage}/${params.level}/${category.slug}`}
              className="text-md flex h-[15vw] w-[15vw] items-center justify-center rounded-xl bg-black/20 text-center"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </>
    </main>
  );
}
