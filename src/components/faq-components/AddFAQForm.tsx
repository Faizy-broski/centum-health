"use client";

import { useState } from "react";
import { FAQ } from "../../types/faq";

interface Props {
  onAdd: (faq: FAQ) => void;
  onClose: () => void;
}

export default function AddFAQForm({ onAdd, onClose }: Props) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!question || !answer) return;

    onAdd({ question, answer });
    setQuestion("");
    setAnswer("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold">Add FAQ</h2>

        <div>
          <label className="block text-sm mb-1">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
