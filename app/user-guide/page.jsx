"use client";
import { motion } from "framer-motion";

export default function UserGuide() {
    const steps = [
        { title: "Sign Up", description: "Create an account to get started." },
        {
            title: "Add Accounts",
            description: "Link your bank accounts or add them manually.",
        },
        {
            title: "Track Transactions",
            description: "Record income & expenses easily.",
        },
        {
            title: "Set Budgets",
            description: "Manage your spending and stay on track.",
        },
        {
            title: "View Reports",
            description: "Analyze your financial trends.",
        },
    ];

    return (
        <section className="min-h-[calc(100vh-120px)] flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 mt-30">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                    User <span className="text-blue-600">Guide</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-lg text-gray-700 mb-12">
                    Follow these simple steps to make the most out of Expensio.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
