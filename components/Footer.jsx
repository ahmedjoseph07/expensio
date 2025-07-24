"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-10 mt-10 border-t">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <Image
                        src={"/logo.png"}
                        alt="expensio logo"
                        width={200}
                        height={60}
                        className="h-12 w-auto object-contain"
                    />
                    <span className="text-xl font-bold text-blue-600">
                        Expensio
                    </span>
                    <p className="text-sm text-gray-500">
                        AI-powered budget management platform that helps you
                        track and optimize your finances effortlessly.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="hover:text-blue-600 transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact-us"
                                className="hover:text-blue-600 transition-colors">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="#"
                                className="hover:text-blue-600 transition-colors">
                                User Guide
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="hover:text-blue-600 transition-colors">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="hover:text-blue-600 transition-colors">
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" className="hover:text-blue-600">
                            <Facebook size={20} />
                        </Link>
                        <Link href="#" className="hover:text-blue-600">
                            <Twitter size={20} />
                        </Link>
                        <Link href="#" className="hover:text-blue-600">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" className="hover:text-blue-600">
                            <Github size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Expensio. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
