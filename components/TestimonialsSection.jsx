"use client";

import { testimonialsData } from "@/data/landingPageData";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % testimonialsData.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    };

    // Auto-slide every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">
                    What Our <span className="text-blue-600">Users Say</span>
                </h2>

                <div className="relative w-full max-w-xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center"
                        >
                            <Image
                                src={testimonialsData[current].image}
                                alt={testimonialsData[current].name}
                                width={80}
                                height={80}
                                className="rounded-full mb-4 border-2 border-gray-200"
                            />
                            <h3 className="text-lg font-semibold">{testimonialsData[current].name}</h3>
                            <p className="text-sm text-gray-500 mb-3">
                                {testimonialsData[current].role}
                            </p>
                            <p className="text-gray-600 text-sm italic">
                                "{testimonialsData[current].quote}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <Button
                            variant="outline"
                            className="rounded-full p-2"
                            onClick={prevSlide}
                        >
                            <ChevronLeft size={20} />
                        </Button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <Button
                            variant="outline"
                            className="rounded-full p-2"
                            onClick={nextSlide}
                        >
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                    {testimonialsData.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                                current === index ? "bg-blue-600 w-6" : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
