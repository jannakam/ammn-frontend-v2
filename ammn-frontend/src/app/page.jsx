import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Image from "next/image";
import LoginSection from "@/components/LoginSection";
import Footer from "@/components/Footer";
import { Logo } from "@/components/Logo";
import AuthSection from "@/components/AuthSection";
import HeroSection from "@/components/HeroSection";
<<<<<<< HEAD
import { getAllUsers } from "@/actions/users";
import { getUser } from "@/actions/token";

export default async function Home() {
  const user = await getUser();
=======
import { Team } from "@/components/Team";
import { Logout } from "@/components/Logout";
import { Slider } from "@/components/Slider";
>>>>>>> 85e24f82d0eae8c2b508b29d3b25ea99112dd0db

  return (
    <div >
      <Logo />
<<<<<<< HEAD
      <AuthSection />
      {/* <HeroSection /> */}
=======
      <Logout />
      {/* <HeroSection />
      <AuthSection />
      <Team />
      <Footer /> */}
      <Slider />
>>>>>>> 85e24f82d0eae8c2b508b29d3b25ea99112dd0db
      <Footer />
    </div>
  );
}
