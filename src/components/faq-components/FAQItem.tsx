"use client";

import { useState } from "react";

interface Props {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="border rounded-lg bg-white">
      <button
        className="w-full flex justify-between items-center p-4 font-medium"
        onClick={() => setOpen(!open)}
      >
        {question}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <p className="px-4 pb-4 text-gray-600">{answer}</p>
      )}
    </div>
  );
}
