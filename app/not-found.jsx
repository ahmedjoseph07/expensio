"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 px-4">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-6xl md:text-8xl font-extrabold text-blue-600 mb-4">
                404
            </motion.h1>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold mb-2">
                Page Not Found
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-gray-500 mb-6 max-w-md">
                Oops! The page you're looking for doesn't exist or has been
                moved.
            </motion.p>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <Link href="/">
                    <Button className="flex items-center gap-2 animate-bounce">
                        <Home size={18} />
                        Go Back Home
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
