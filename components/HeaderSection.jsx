import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const HeaderSection = async() => {
    await checkUser();
    return (
        <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="cursor-pointer flex items-center justify-center">
                    <Image
                        src={"/logo.png"}
                        alt="expensio logo"
                        width={200}
                        height={60}
                        className="h-10 w-auto object-contain"
                    />
                    <span className="text-xl font-bold hidden md:block gradient pt-2">Expensio</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <Link
                            href={"/dashboard"}
                            className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                >
                                <LayoutDashboard size={18} />
                                <span className="hidden md:inline">Dashboard</span>
                            </Button>
                        </Link>

                        <Link href={"/transaction/create"}>
                            <Button>
                                <PenBox size={18} />
                                <span className="hidden md:inline">
                                    Add Transaction
                                </span>
                            </Button>
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <Button
                                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:border-blue-500 hover:text-blue-600"
                                variant="outline">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox:
                                        "w-16 h-16 border-2 border-gray-200 rounded-full cursor-pointer hover:border-blue-500 transition-all duration-200",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </nav>
            <hr className="border-gray-200" />
        </div>
    );
};

export default HeaderSection;
