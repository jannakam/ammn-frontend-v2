"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ProfileModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>

        {/* Modal content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>
              Your profile details
            </DialogDescription>
          </DialogHeader>


          <DialogFooter>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default ProfileModal;
