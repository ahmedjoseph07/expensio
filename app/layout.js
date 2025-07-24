import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
    title: "Expensio",
    description: "One Click Budget Management Platform",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${outfit.className}`}>
                    {/* Header */}
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    {/* Footer */}
                    <footer className="bg-blue-50 py-12">
                        <div className="container text-center mx-auto px-4 text-gray-600 ">
                            <p>Built by a student,for the students ❤️</p>
                        </div>
                    </footer>
                </body>
            </html>
            /
        </ClerkProvider>
    );
}
