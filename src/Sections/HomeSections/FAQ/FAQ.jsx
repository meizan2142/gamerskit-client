import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Heading from "../../../Components/Heading";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is GamersKit?",
      answer:
        "GamersKit is your one-stop destination for gaming gear, accessories, and esports news. We provide high-quality products and a community for gamers.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "For now, we only ship within Bangladesh. We plan to expand our shipping options in the future.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you’ll track your order through a phone number or email provided during checkout.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Absolutely. We have a 7-day return policy if the product is unused and in original packaging. Contact support for assistance.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-black text-white">
      <div className="2xl:container 2xl:mx-auto 2xl:mt-10 px-4">
        <Heading
          title="FAQ"
          subtitle="Find answers to the most common questions"
        />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1c1c1c] rounded-xl shadow-md p-5 cursor-pointer transition hover:bg-[#222]"
              onClick={() => toggleFAQ(index)}>
              {/* Question */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-yellow-400" : ""
                  }`}
                />
              </div>

              {/* Answer */}
              <div
                className={`mt-3 text-gray-300 text-sm transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
