import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Image from "next/image";
import LoginSection from "@/components/LoginSection";
import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";
import AuthSection from "@/components/AuthSection";
import HeroSection from "@/components/HeroSection";
import { Team } from "@/components/Team";
import { Logout } from "@/components/Logout";
import { Slider } from "@/components/Slider";

export default function Home() {
  return (
    <div >
      <Logo />
      <Logout />
      {/* <HeroSection />
      <AuthSection />
      <Team />
      <Footer /> */}
      <Slider />
      <Footer />
    </div>
  );
}
