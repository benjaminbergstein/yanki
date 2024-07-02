import Card from "~/app/_components/Card";
import { api } from "~/trpc/server";

type ParamsType = {
  fluentLanguage: string;
  learningLanguage: string;
  level: string;
  topic: string;
  term: string;
};
export default async function Home({ params }: { params: ParamsType }) {
  console.log({ params });
  const card = await api.card.create(params);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Card {...card} />
    </main>
  );
}

export const revalidate = 600;
