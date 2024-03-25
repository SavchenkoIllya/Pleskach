"use client";
import { useEffect, useState } from "react";
import { landing } from "../locales/ru-RU/ru";

export default function LandingLoading({ delay = 1000 }) {
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainContent(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    !showMainContent && (
      <main className="flex h-[100dvh] w-[100dvw] items-center justify-center bg-background">
        <h1 className="h1-landing">{landing.loading}</h1>
      </main>
    )
  );
}
