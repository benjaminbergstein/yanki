"use client";
import Link from "next/link";
import { useState } from "react";

export type Card = {
  backText: string;
  frontText: string;
  backSentence: string;
  frontSentence: string;
  fluentLangEtymology: string;
  learningLangEtymology: string;
};

export default function Card(props: Card) {
  const { backText, frontText, backSentence, frontSentence } = props;
  const [isFront, setIsFront] = useState(true);
  function toggle() {
    setIsFront(!isFront);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative rounded-xl bg-black/40 p-10">
        <div className="text-[4vw] font-extrabold">{frontText}</div>
        {frontSentence.split(" ").map((token: string) => {
          const parts = token.split(/ /);

          return (
            <>
              {parts.map(() => {
                if (/^$/.test(token)) {
                  return <span key={token}>{token} </span>;
                } else {
                  return (
                    <Link key={token} href={`${token}`}>
                      {token}{" "}
                    </Link>
                  );
                }
              })}
            </>
          );
        })}
      </div>
      <button onClick={toggle} className="rounded bg-white/40 p-2">
        {isFront ? "Reveal" : "Hide"}
      </button>
      {!isFront && (
        <div className="rounded-xl bg-black/40 p-10">
          <div className="text-[4vw] font-extrabold">{backText}</div>
          <div className="text-[2vw] font-light">{backSentence}</div>
        </div>
      )}
    </div>
  );
}
