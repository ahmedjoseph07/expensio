"use client";
import { motion } from "framer-motion";

export default function ContactUs() {
    return (
        <section className="min-h-[calc(100vh-120px)] flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 mt-30">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                    Contact <span className="text-blue-600">Us</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-lg text-gray-700 mb-12">
                    Have questions or need help? Our team is here for you.
                    Whether it's technical support, account issues, or general
                    inquiries, feel free to reach out.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { label: "Email", value: "support@expensio.com" },
                        { label: "Phone", value: "+880171234567" },
                        { label: "Office", value: "CUET, Chittagong" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                {item.label}
                            </h3>
                            <p className="text-gray-600">{item.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
