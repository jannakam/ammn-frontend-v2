import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  Home,
  LayoutDashboard,
  User
} from "lucide-react";
import Image from "next/image";

export function Dock() {
  const links = [
    {
      title: "Home",
      icon: <Home className="h-full w-full" />,
      href: "#",
    },
    {
      title: "Components",
      icon: <LayoutDashboard className="h-full w-full" />,
      href: "#",
    },
    {
      title: "Profile",
      icon: <User className="h-full w-full" />,
      href: "#",
    },
  ];

  return (
    <div className="fixed flex items-center justify-center h-[35rem] w-full z-40">
      <FloatingDock
        // only for demo, remove for production
        mobileClassName="translate-y-20"
        items={links}
      />
    </div>
  );
}
