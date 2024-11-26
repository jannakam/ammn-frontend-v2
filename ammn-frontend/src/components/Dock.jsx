"use client";

import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  HeartHandshake,
  Home,
  User,
  Users,
  Star,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import ProfileModal from "@/components/modals/ProfileModal";
import FriendsModal from "@/components/modals/FriendsModal";
import SalifnyModal from "@/components/modals/SalifnyModal";
import GatiyaModal from "@/components/modals/GatiyaModal";

export function Dock() {
  const [activeModal, setActiveModal] = useState(null); // Track active modal

  const links = [
    { title: "Home", icon: <Home className="h-full w-full" />, href: "#" }, // No modal for Home
    { title: "Profile", icon: <User className="h-full w-full" />, href: "#", modal: "profile" },
    { title: "Friends", icon: <Star className="h-full w-full" />, href: "#", modal: "friends" },
    { title: "Salifny", icon: <HeartHandshake className="h-full w-full" />, href: "#", modal: "salifny" },
    { title: "Gatiya", icon: <Users className="h-full w-full" />, href: "#", modal: "gatiya" },
  ];

  const renderModal = () => {
    switch (activeModal) {
      case "profile":
        return <ProfileModal onClose={() => setActiveModal(null)} />;
      case "friends":
        return <FriendsModal onClose={() => setActiveModal(null)} />;
      case "salifny":
        return <SalifnyModal onClose={() => setActiveModal(null)} />;
      case "gatiya":
        return <GatiyaModal onClose={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed flex items-center justify-center w-full z-40">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links.map((link) => ({
          ...link,
          onClick: link.modal ? () => setActiveModal(link.modal) : null, // Only set active modal for links with modals
        }))}
      />
      {renderModal()}
    </div>
  );
}
