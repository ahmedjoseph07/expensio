"use client";
import { motion } from "framer-motion";

export default function Support() {
    return (
        <section className="min-h-[calc(100vh-120px)] flex items-center bg-gradient-to-br mt-30 from-blue-50 via-white to-purple-50 py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                    Customer <span className="text-blue-600">Support</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-lg text-gray-700 mb-12">
                    Our dedicated support team is available 24/7 to help you
                    with any issues or questions about Expensio.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="p-6 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">
                            Email Support
                        </h3>
                        <p className="text-gray-600">support@expensio.com</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="p-6  bg-white cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">
                            Live Chat
                        </h3>
                        <p className="text-gray-600">
                            Available in your dashboard from 9AM - 9PM
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
