"use client";
import { motion } from "framer-motion";

export default function FAQs() {
    const faqs = [
        {
            question: "Is Expensio free?",
            answer: "Yes, Expensio offers a free plan with core features.",
        },
        {
            question: "Can I use Expensio on mobile?",
            answer: "Yes, our platform is fully responsive and works on all devices.",
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use bank-grade encryption and follow industry security standards.",
        },
    ];

    return (
        <section className="min-h-[calc(100vh-120px)] flex items-center bg-gradient-to-br from-blue-50 mt-30 via-white to-purple-50 py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                    Frequently Asked{" "}
                    <span className="text-blue-600">Questions</span>
                </h1>

                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">
                                {faq.question}
                            </h3>
                            <p className="text-gray-600">{faq.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
