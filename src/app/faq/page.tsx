"use client";

import { useState } from "react";
import FAQItem from "../../components/faq-components/FAQItem";
import AddFAQForm from "../../components/faq-components/AddFAQForm";
import initialFaqs from "../../dto/faqs";
import { FAQ } from "../../types/faq";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [showForm, setShowForm] = useState<boolean>(false);

  function addFAQ(faq: FAQ) {
    setFaqs((prev) => [...prev, faq]);
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">FAQs</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>

      {showForm && (
        <AddFAQForm
          onAdd={addFAQ}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
}
