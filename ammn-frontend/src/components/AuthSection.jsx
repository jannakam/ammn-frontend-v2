"use client";

import { useState } from "react";
import LoginSection from "@/components/LoginSection";
import RegisterSection from "@/components/RegisterSection";

export default function AuthSection() {
  const [isLogin, setIsLogin] = useState(true); // Track whether to show Login or Register

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center h-auto mb-20 gap-8 md:gap-12 px-6">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg mb-6 text-muted-foreground">
          Join us to explore amazing opportunities and connect with like-minded individuals. Already a member? Login now to get started.
        </p>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary-hover focus:outline-none"
        >
          {isLogin ? "Create an Account" : "Already Have an Account?"}
        </button>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2">
        {isLogin ? (
          <LoginSection toggleToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterSection toggleToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
