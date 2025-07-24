import BannerSection from "@/components/BannerSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TryForFreeSection from "@/components/TryForFreeSection";

export default function Home() {
    return (
        <div className="mt-40">
            <BannerSection/>
            <StatsSection/>
            <FeaturesSection/>
            <HowItWorksSection/>
            <TestimonialsSection/>
            <TryForFreeSection/>
        </div>
    );
}
