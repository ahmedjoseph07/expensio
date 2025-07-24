"use client";

import { featuresData } from "@/data/landingPageData";
import { motion } from "framer-motion";

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">
                    Why Choose <span className="text-blue-600">Expensio?</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
