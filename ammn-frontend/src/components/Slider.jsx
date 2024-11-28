"use client";

import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";
import AuthSection from "@/components/AuthSection";
import HeroSection from "@/components/HeroSection";
import { Team } from "@/components/Team";
import StackedCards from "./StackedCards";
import { Button } from "./ui/button";
import Image from "next/image";


export function Slider() {

    const handleScrollToAuthSection = () => {
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
          Button: "Explore the Wallet",
        },
        {
          title: "قطية",
          subtitle: "Budget as a Team!",
          description:
            "Planning a trip or buying a gift for a mutual friend? Create a joint expenses account and simplify managing group finances.",
          Button: "Start Budgeting",
        },
        {
          title: "سلفني",
          subtitle: "Friendship Meets Accountability!",
          description:
            "Planning a trip or buying a gift for a mutual friend? Create a joint expenses account and simplify managing group finances.",
          Button: "Start Budgeting",
        },
      ];

    return (
        <div className="relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent">
            <HeroSection className="mt-2" />
        </div>
        {/* <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background text-foreground">
            <StackedCards className="mt-2" />
        </div> */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background text-foreground">
            <Slide1 onButtonClick={handleScrollToAuthSection} />
        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background text-foreground">
            <Slide2 onButtonClick={handleScrollToAuthSection} />

        </div>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background text-foreground">
            <Slide3 onButtonClick={handleScrollToAuthSection} />

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

const Slide1 = ({ onButtonClick }) => {
    return (
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 bg-accent w-screen mx-[20rem]">
        <Image src="/3dicons/wallet.png" alt="Wallet" width={400} height={400} />

        <div className="flex flex-col">
        <h2 className="text-6xl font-bold slides">{`بوك من غير بنوك`}</h2>
        <p className="text-xl mt-4 welcome-back">Pay Now, Transfer Later!</p>
        <p className="text-xl mt-6 welcome-back">
          A wallet for the modern age. Spend money, manage accounts, and skip the bank—because you deserve financial freedom on your terms.
        </p>
        <Button
          className="mt-8 px-4 py-2 welcome-back rounded-lg hover:scale-105 transition-transform"
          onClick={onButtonClick}
        >
          Explore the Wallet
        </Button>
        </div>
      </div>
    );
  };

  const Slide2 = ({ onButtonClick }) => {
    return (
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 bg-destructive w-screen mx-[20rem]">
        <Image src="/3dicons/gift.png" alt="Wallet" width={400} height={400} />

        <div className="flex flex-col">

        <h2 className="text-6xl font-bold slides">{`قطية`}</h2>
        <p className="text-xl mt-4 welcome-back">Budget as a Team!</p>
        <p className="text-xl mt-6 welcome-back">
          Planning a trip or buying a gift for a mutual friend? Create a joint expenses account and simplify managing group finances.
        </p>
        <Button
          className="mt-8 px-4 py-2 welcome-back rounded-lg hover:scale-105 transition-transform"
          onClick={onButtonClick}
        >
          Start Budgeting
        </Button>
        </div>
      </div>
    );
  };

  const Slide3 = ({ onButtonClick }) => {
    return (
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 bg-accent w-screen mx-[20rem]">
        <Image src="/3dicons/money.png" alt="Wallet" width={400} height={400} />

        <div className="flex flex-col">
        <h2 className="text-6xl font-bold slides">{`سلفني`}</h2>
        <p className="text-xl mt-4 welcome-back">Friendship Meets Accountability!</p>
        <p className="text-xl mt-6 welcome-back">
          Planning a trip or buying a gift for a mutual friend? Create a joint expenses account and simplify managing group finances.
        </p>
        <Button
          className="mt-8 px-4 py-2 welcome-back rounded-lg hover:scale-105 transition-transform"
          onClick={onButtonClick}
        >
          Start Budgeting
        </Button>
      </div>
      </div>
    );
  };
  