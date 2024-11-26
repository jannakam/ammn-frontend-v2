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

const SalifnyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>

        <DialogContent>

          <DialogHeader>
            <DialogTitle>Salifny</DialogTitle>
            <DialogDescription>
            Request money from friends and family with ease.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default SalifnyModal;
