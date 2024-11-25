import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Image from "next/image";
import LoginSection from "@/components/LoginSection";
import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";
import AuthSection from "@/components/AuthSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <Logo />
      {/* <AuthSection /> */}
      <HeroSection />
      <Footer />
    </div>
  );
}
