"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

const TryForFreeSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Take Control of <span className="text-blue-600">Your Finances</span> 
                </h2>
                <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
                    Join thousands of users who are already managing their
                    budgets smarter with Expensio.
                </p>

                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                    }}>
                    <Link href="/sign-up">
                        <Button
                            size="lg" className="mx-auto" variant="outline">
                            
                            Try For Free
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default TryForFreeSection;
