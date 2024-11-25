"use client";

import { useState } from "react";
import LoginSection from "@/components/LoginSection";
import RegisterSection from "@/components/RegisterSection";

export default function AuthSection() {
  const [isLogin, setIsLogin] = useState(true); // Track whether to show Login or Register

  return (
    <div className="flex items-center justify-center h-auto mb-20">
      {isLogin ? (
        <LoginSection toggleToRegister={() => setIsLogin(false)} />
      ) : (
        <RegisterSection toggleToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}
