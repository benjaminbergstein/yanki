"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Card = {
  backText: string;
  frontText: string;
  backSentence: string;
  frontSentence: string;
  fluentLangEtymology: string;
  learningLangEtymology: string;
};
