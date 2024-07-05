import Link from "next/link";
import { redirect } from "next/navigation";

const levels = [
  {
    code: "beginner",
    name: "Beginner",
  },
  {
    code: "intermediate",
    name: "Intermediate",
  },
  {
    code: "advanced",
    name: "Advanced",
  },
];

const supportedLanguages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "es",
    name: "Spanish",
  },
  {
    code: "fr",
    name: "French",
  },
  {
    code: "de",
    name: "German",
  },
  {
    code: "it",
    name: "Italian",
  },
  {
    code: "ja",
    name: "Japanese",
  },
  {
    code: "ko",
    name: "Korean",
  },
  {
    code: "pt",
    name: "Portuguese",
  },
  {
    code: "ru",
    name: "Russian",
  },
  {
    code: "zh",
    name: "Chinese",
  },
  {
    code: "ar",
    name: "Arabic",
  },
  {
    code: "hi",
    name: "Hindi",
  },
  {
    code: "tr",
    name: "Turkish",
  },
  {
    code: "nl",
    name: "Dutch",
  },
  {
    code: "pl",
    name: "Polish",
  },
  {
    code: "sv",
    name: "Swedish",
  },
  {
    code: "cs",
    name: "Czech",
  },
  {
    code: "da",
    name: "Danish",
  },
  {
    code: "fi",
    name: "Finnish",
  },
  {
    code: "el",
    name: "Greek",
  },
  {
    code: "hu",
    name: "Hungarian",
  },
  {
    code: "no",
    name: "Norwegian",
  },
  {
    code: "ro",
    name: "Romanian",
  },
  {
    code: "th",
    name: "Thai",
  },
  {
    code: "uk",
    name: "Ukrainian",
  },
  {
    code: "vi",
    name: "Vietnamese",
  },
  {
    code: "id",
    name: "Indonesian",
  },
  {
    code: "ms",
    name: "Malay",
  },
  {
    code: "he",
    name: "Hebrew",
  },
  {
    code: "ca",
    name: "Catalan",
  },
  {
    code: "hr",
    name: "Croatian",
  },
  {
    code: "sk",
    name: "Slovak",
  },
  {
    code: "sq",
    name: "Albanian",
  },
  {
    code: "sr",
    name: "Serbian",
  },
  {
    code: "bg",
    name: "Bulgarian",
  },
  {
    code: "et",
    name: "Estonian",
  },
  {
    code: "lt",
    name: "Lithuanian",
  },
  {
    code: "lv",
    name: "Latvian",
  },
  {
    code: "mk",
    name: "Macedonian",
  },
  {
    code: "sl",
    name: "Slovenian",
  },
  {
    code: "bs",
    name: "Bosnian",
  },
  {
    code: "is",
    name: "Icelandic",
  },
  {
    code: "ga",
    name: "Irish",
  },
  {
    code: "mt",
    name: "Maltese",
  },
  {
    code: "eu",
    name: "Basque",
  },
  {
    code: "gl",
    name: "Galician",
  },
  {
    code: "af",
    name: "Afrikaans",
  },
  {
    code: "sw",
    name: "Swahili",
  },
  {
    code: "cy",
    name: "Welsh",
  },
  {
    code: "am",
    name: "Amharic",
  },
  {
    code: "hy",
    name: "Armenian",
  },
  {
    code: "az",
    name: "Azerbaijani",
  },
  {
    code: "bn",
    name: "Bengali",
  },
  {
    code: "my",
    name: "Burmese",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: {
    fluentLanguage?: string;
    learningLanguage?: string;
    level?: string;
  };
}) {
  const fluentLanguage =
    searchParams.fluentLanguage === "undefined"
      ? undefined
      : searchParams.fluentLanguage;

  const learningLanguage =
    searchParams.learningLanguage === "undefined"
      ? undefined
      : searchParams.learningLanguage;

  const level =
    searchParams.level === "undefined" ? undefined : searchParams.level;

  if (fluentLanguage && learningLanguage && level) {
    return redirect(
      `/cards/${searchParams.fluentLanguage}/${searchParams.learningLanguage}/${searchParams.level}`,
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {!fluentLanguage && (
        <>
          <div className="text-2xl">What language do you speak?</div>
          <div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row">
            {supportedLanguages.map((language) => (
              <Link
                key={language.code}
                href={`?fluentLanguage=${language.code}&learningLanguage=${searchParams.learningLanguage}`}
                className="flex w-full items-center justify-center rounded-xl bg-black/20 py-3 text-2xl sm:h-[15vw] sm:w-[15vw] sm:py-0"
              >
                {language.name}
              </Link>
            ))}
          </div>
        </>
      )}
      {!learningLanguage && (
        <>
          <div className="text-2xl">What language do you want to learn?</div>
          <div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row">
            {supportedLanguages.map(
              (language) =>
                language.code !== searchParams.fluentLanguage && (
                  <Link
                    key={language.code}
                    href={`?learningLanguage=${language.code}&fluentLanguage=${searchParams.fluentLanguage}`}
                    className="flex w-full items-center justify-center rounded-xl bg-black/20 py-3 text-2xl sm:h-[15vw] sm:w-[15vw] sm:py-0"
                  >
                    {language.name}
                  </Link>
                ),
            )}
          </div>
        </>
      )}
      {!level && (
        <>
          <div className="text-2xl">
            What level are you currently in the language you want to learn?
          </div>
          <div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row">
            {levels.map((level) => (
              <Link
                key={level.code}
                href={`?learningLanguage=${searchParams.learningLanguage}&fluentLanguage=${searchParams.fluentLanguage}&level=${level.code}`}
                className="flex items-center justify-center rounded-xl bg-black/20 text-2xl sm:h-[15vw] sm:w-[15vw]"
              >
                {level.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
