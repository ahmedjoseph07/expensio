"use client";

import { statsData } from "@/data/landingPageData.js";
import { motion } from "framer-motion";

const StatsSection = () => {
    return (
        <section className="py-16 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {statsData.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-4 cursor-pointer rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-200">
                        <h3 className="text-3xl md:text-4xl font-bold text-blue-600">
                            {stat.value}
                        </h3>
                        <p className="text-gray-600 mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
