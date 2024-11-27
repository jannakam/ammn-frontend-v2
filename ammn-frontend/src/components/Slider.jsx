import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";
import AuthSection from "@/components/AuthSection";
import HeroSection from "@/components/HeroSection";
import { Team } from "@/components/Team";

export function Slider() {
    return (
        <div className="relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent">
            <HeroSection className="mt-2" />
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background text-foreground">
            <AuthSection className="mt-2" />
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary text-foreground">
            <Team className="mt-2" />
        </div>
        {/* <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-accent to-background text-background">
            <h2 className="text-4xl font-bold">The Fourth slide</h2>
        </div> */}
    </div>
    )
}