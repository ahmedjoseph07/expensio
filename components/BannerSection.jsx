"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Compass, BookOpen } from "lucide-react";

const BannerSection = () => {
    const imageRef = useRef();
    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const position = window.scrollY;
            const allowed = 100;
            if (position > allowed) {
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="pb-20 px-4">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl md:text-8xl pb-6 gradient">
                    Smarter Budget Management Platform with AI
                </h1>

                {/* React Simple Typewriter */}
                <div className="text-lg md:text-3xl text-blue-600 font-semibold my-8 h-6">
                    <Typewriter
                        words={[
                            "Track your expenses in real-time",
                            "Analyze with AI-powered insights",
                            "Plan your budgets effortlessly",
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={50}
                        deleteSpeed={40}
                        delaySpeed={1500}
                    />
                </div>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Expensio is an AI-powered budget management platform
                    designed to help you effortlessly track, analyze, and
                    optimize your finances. Get real-time insights and make
                    informed financial decisions with ease.
                </p>

                {/* Buttons */}
                <div className="flex justify-center space-x-4 mb-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Button variant="outline">
                            <Compass /> Explore More
                        </Button>
                    </Link>

                    <Link href="">
                        <Button className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-blue-600 hover:text-white">
                            <BookOpen /> See Manual
                        </Button>
                    </Link>
                </div>

                {/* Image Container */}
                <div className="banner-image-container">
                    <div ref={imageRef} className="banner-image">
                        <Image
                            src="/banner.jpg"
                            width={1280}
                            height={720}
                            alt="banner-image"
                            className="rounded-lg shadow-2xl border mx-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
