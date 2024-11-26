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

const FriendsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Trigger to open the modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Open Modal
          </Button>
        </DialogTrigger>

        {/* Modal content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal Title</DialogTitle>
            <DialogDescription>
              This is a basic modal using ShadCN UI components. You can customize the content inside.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p>Here is some content for your modal. You can add anything you want here.</p>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => alert("Action performed!")}>Do Something</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FriendsModal;
