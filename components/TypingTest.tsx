"use client";

import { RotateCcw } from "lucide-react";
import { type KeyboardEvent as ReactKeyboardEvent, useRef, useState } from "react";

// Static for now (see DESIGN.md) — visual typing widget with live per-character
// highlighting but no WPM/scoring yet.
const SENTENCES = [
  "Pack my box with five dozen liquor jugs.",
  "The quick brown fox jumps over the lazy dog.",
  "Sphinx of black quartz, judge my vow.",
  "How vexingly quick daft zebras jump!",
];

const TypingTest = () => {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sentence = SENTENCES[index];

  const focus = () => inputRef.current?.focus();

  const nextSentence = () => {
    setIndex((i) => (i + 1) % SENTENCES.length);
    setTyped("");
    focus();
  };

  const restart = () => {
    setTyped("");
    focus();
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      nextSentence();
    }
  };

  return (
    <div className="w-full font-mono">
      <button
        type="button"
        onClick={focus}
        className="block w-full cursor-text text-left text-sm/7 tracking-tight"
        aria-label="Focus typing test"
      >
        {sentence.split("").map((char, i) => {
          const typedChar = typed[i];
          const state =
            typedChar == null
              ? "text-muted-foreground/50"
              : typedChar === char
                ? "text-foreground"
                : "text-red-500 underline decoration-red-500/60";
          const isCursor = i === typed.length;
          return (
            <span
              key={i}
              className={`${state} ${isCursor ? "border-l border-accent" : ""}`}
            >
              {char}
            </span>
          );
        })}
      </button>

      <div className="mt-3 border border-border bg-card px-3 py-2">
        <input
          ref={inputRef}
          value={typed}
          onChange={(e) => setTyped(e.target.value.slice(0, sentence.length))}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          placeholder="Click here to start typing..."
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <kbd className="border border-border bg-muted px-1.5 py-0.5 text-[10px]">
            TAB
          </kbd>
          new sentence
        </span>
        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-1.5 transition hover:text-foreground"
        >
          <RotateCcw className="size-3" />
          restart
        </button>
      </div>
    </div>
  );
};

export default TypingTest;
