import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/HeaderSection";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"

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
                    <Toaster richColors/>
                    {/* Footer */}
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
