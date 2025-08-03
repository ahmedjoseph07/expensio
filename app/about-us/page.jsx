"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
    const values = [
        {
            title: "Simplicity",
            description:
                "We believe in making budgeting simple and intuitive so anyone can start tracking finances without feeling overwhelmed.",
        },
        {
            title: "Automation",
            description:
                "Our platform automates repetitive tasks such as categorizing transactions and generating insightful reports.",
        },
        {
            title: "Security",
            description:
                "Your privacy is our priority. We use bank-level encryption and security practices to keep your data safe.",
        },
        {
            title: "Community",
            description:
                "We aim to build a community where users can share tips, success stories, and learn from each other’s experiences.",
        },
    ];

    return (
        <section className="min-h-[calc(100vh-120px)] flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 mt-30">
            <div className="container mx-auto px-4 text-center">
                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                    About <span className="text-blue-600">Us</span>
                </h1>

                {/* Intro Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-12">
                    Expensio is a modern budget management platform designed to
                    make financial tracking effortless. Our mission is to
                    empower individuals and businesses to manage their finances
                    with ease, using automation, insights, and a clean,
                    intuitive interface.
                </motion.p>

                {/* Core Values */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                            <h3 className="text-xl font-semibold mb-2 text-blue-600">
                                {value.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
