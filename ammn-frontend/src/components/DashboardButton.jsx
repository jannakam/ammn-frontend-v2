"use client";

import React from "react";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

export function DashboardButton() {
  const handleRedirect = () => {
    redirect("/dashboard"); // Redirects to the dashboard route
  };

  return (
    <LayoutDashboard
      onClick={handleRedirect}
      className="fixed top-8 right-20 h-6 w-6 cursor-pointer"
    />
  );
}
