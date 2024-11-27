import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { joinGatiyaAccount } from "@/actions/transactions";

export function JoinGatiyaModal({ isOpen, onClose, onJoinSuccess }) {
  const { toast } = useToast();
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJoinGatiyaAccount = async () => {
    setIsSubmitting(true);
    try {
      const newGatiyaAccount = await joinGatiyaAccount(inviteCode);
      if (newGatiyaAccount) {
        toast({ description: "Successfully joined the Gatiya account!" });
        setInviteCode("");
        onJoinSuccess(newGatiyaAccount);
        onClose();
      } else {
        toast({ description: "Failed to join the Gatiya account." });
      }
    } catch (error) {
      console.error("Error joining Gatiya account:", error);
      toast({
        description:
          error.message ||
          "An error occurred while joining the Gatiya account.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Gatiya Account</DialogTitle>
          <DialogDescription>
            Enter the invite code to join an existing Gatiya account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="invite-code">Invite Code</Label>
            <Input
              id="invite-code"
              type="text"
              placeholder="Enter invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleJoinGatiyaAccount}
            disabled={isSubmitting || !inviteCode}
          >
            {isSubmitting ? "Joining..." : "Join"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
