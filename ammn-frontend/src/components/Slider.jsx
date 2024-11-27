import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";
import AuthSection from "@/components/AuthSection";
import HeroSection from "@/components/HeroSection";
import { Team } from "@/components/Team";
import StackedCards from "./StackedCards";


export function Slider() {

    const handleButtonClick = () => {
        const authSection = document.getElementById("auth-section");
        if (authSection) {
          authSection.scrollIntoView({ behavior: "smooth" });
        }
      };

    const items = [
        {
          title: "بوك من غير بنوك",
          subtitle: "Pay Now, Transfer Later!",
          description:
            "A wallet for the modern age. Spend money, manage accounts, and skip the bank—because you deserve financial freedom on your terms.",
          button: "Explore the Wallet",
        },
        {
          title: "قطية",
          subtitle: "Budget as a Team!",
          description:
            "Planning a trip or buying a gift for a mutual friend? Create a joint expenses account and simplify managing group finances.",
          button: "Start Budgeting",
        },
        {
          title: "سلفني",
          subtitle: "Friendship Meets Accountability!",
          description:
            "Planning a trip or buying a gift for a mutual friend? Create a joint expenses account and simplify managing group finances.",
          button: "Start Budgeting",
        },
      ];

    return (
        <div className="relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent">
            <HeroSection className="mt-2" />
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background text-foreground">
            <StackedCards className="mt-2" />
        </div>
        <div id="auth-section" className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background text-foreground">
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