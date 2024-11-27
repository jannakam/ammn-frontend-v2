import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Image from "next/image";
import LoginSection from "@/components/LoginSection";
import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";
import AuthSection from "@/components/AuthSection";
import HeroSection from "@/components/HeroSection";
import { getAllUsers } from "@/actions/users";
import { getUser } from "@/actions/token";

export default async function Home() {
  const user = await getUser();

  return (
    <div>
      <Logo />
      <AuthSection />
      {/* <HeroSection /> */}
      <Footer />
    </div>
  );
}
