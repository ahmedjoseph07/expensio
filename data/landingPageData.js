import {
    BarChart3,
    Receipt,
    PieChart,
    CreditCard,
    Globe,
    Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
    {
        value: "120K+",
        label: "Active Users",
    },
    {
        value: "$5B+",
        label: "Transactions Tracked",
    },
    {
        value: "99.95%",
        label: "System Uptime",
    },
    {
        value: "4.8/5",
        label: "User Satisfaction",
    },
];

// Features Data
export const featuresData = [
    {
        icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
        title: "Real-Time Analytics",
        description:
            "Track spending patterns and financial health with instant AI insights.",
    },
    {
        icon: <Receipt className="h-8 w-8 text-blue-600" />,
        title: "AI Receipt Capture",
        description:
            "Automatically extract data from bills and receipts using AI-powered scanning.",
    },
    {
        icon: <PieChart className="h-8 w-8 text-blue-600" />,
        title: "Smart Budgeting",
        description:
            "Plan and adjust budgets intelligently with data-driven recommendations.",
    },
    {
        icon: <CreditCard className="h-8 w-8 text-blue-600" />,
        title: "Unified Account View",
        description:
            "Link and manage all your accounts and credit cards from one dashboard.",
    },
    {
        icon: <Globe className="h-8 w-8 text-blue-600" />,
        title: "Global Currency Support",
        description: "Monitor and convert multiple currencies in real-time.",
    },
    {
        icon: <Zap className="h-8 w-8 text-blue-600" />,
        title: "Smart Financial Tips",
        description:
            "Receive automated tips to save money and improve your finances.",
    },
];

// How It Works Data
export const howItWorksData = [
    {
        icon: <CreditCard className="h-8 w-8 text-blue-600" />,
        title: "1. Sign Up Easily",
        description:
            "Create your account quickly with our secure and simple onboarding.",
    },
    {
        icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
        title: "2. Monitor Finances",
        description:
            "Automatically track and categorize all your financial transactions.",
    },
    {
        icon: <PieChart className="h-8 w-8 text-blue-600" />,
        title: "3. Gain Insights",
        description:
            "Leverage AI-powered insights to plan your financial future effectively.",
    },
];

// Testimonials Data
export const testimonialsData = [
    {
        name: "Sarah Johnson",
        role: "Entrepreneur",
        image: "https://randomuser.me/api/portraits/women/75.jpg",
        quote: "Expensio has completely streamlined how I handle my business expenses. The automated analytics are a lifesaver for small business owners like me.",
    },
    {
        name: "Michael Chen",
        role: "Freelance Designer",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        quote: "With the AI receipt capture, I save hours of manual work every week. It's like having a personal finance assistant.",
    },
    {
        name: "Emily Rodriguez",
        role: "Investment Consultant",
        image: "https://randomuser.me/api/portraits/women/74.jpg",
        quote: "I recommend Expensio to anyone managing multiple accounts. The global currency support is a game-changer for international clients.",
    },
];
