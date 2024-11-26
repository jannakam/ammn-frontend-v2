import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { HeartHandshake, Home, User, Users, Star } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";

import ProfileModal from "@/components/modals/ProfileModal";
import FriendsModal from "@/components/modals/FriendsModal";
import SalifnyModal from "@/components/modals/SalifnyModal";
import GatiyaModal from "@/components/modals/GatiyaModal";

export function Dock() {
  const [activeModal, setActiveModal] = useState(null);

  const links = [
    {
      title: "Home",
      icon: <Home className="h-full w-full" />,
      href: "/",
      modal: null, // No modal for Home
    },
    {
      title: "Profile",
      icon: <User className="h-full w-full" />,
      href: "#",
      modal: (
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => setActiveModal("profile")}
              className="h-10 w-10 flex items-center justify-center rounded-full"
            >
              <User className="h-full w-full" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <ProfileModal onClose={() => setActiveModal(null)} />
          </DialogContent>
        </Dialog>
      ),
    },
    {
      title: "Friends",
      icon: <Star className="h-full w-full" />,
      href: "#",
      modal: (
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => setActiveModal("friends")}
              className="h-10 w-10 flex items-center justify-center rounded-full"
            >
              <Star className="h-full w-full" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <FriendsModal onClose={() => setActiveModal(null)} />
          </DialogContent>
        </Dialog>
      ),
    },
    {
      title: "Salifny",
      icon: <HeartHandshake className="h-full w-full" />,
      href: "#",
      modal: (
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => setActiveModal("salifny")}
              className="h-10 w-10 flex items-center justify-center rounded-full"
            >
              <HeartHandshake className="h-full w-full" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <SalifnyModal onClose={() => setActiveModal(null)} />
          </DialogContent>
        </Dialog>
      ),
    },
    {
      title: "Gatiya",
      icon: <Users className="h-full w-full" />,
      href: "#",
      modal: (
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={() => setActiveModal("gatiya")}
              className="h-10 w-10 flex items-center justify-center rounded-full"
            >
              <Users className="h-full w-full" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <GatiyaModal onClose={() => setActiveModal(null)} />
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  return (
    <div className="fixed flex items-center justify-center w-full z-40">
      <FloatingDock
        items={links.map((link) => ({
          title: link.title,
          icon: link.modal || (
            <a
              href={link.href}
              className="h-10 w-10 flex items-center justify-center rounded-full"
            >
              {link.icon}
            </a>
          ), // Render icon as a link for "Home"
          href: link.href,
        }))}
      />
    </div>
  );
}
