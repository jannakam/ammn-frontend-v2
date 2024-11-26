import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JoinGatiyaModal } from "@/components/modals/JoinGatiyaAccountModal";

export function Gatiya() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gatiyas, setGatiyas] = useState([
    // Initialize with your existing Gatiya accounts from the user's gityaAccountList
  ]);

  const handleJoinSuccess = (newGatiyaAccount) => {
    setGatiyas((prevGatiyas) => [...prevGatiyas, newGatiyaAccount]);
  };

  return (
    <Card className="h-full overflow-scroll backdrop-blur-lg bg-background/40">
      <CardHeader className="sticky top-0 z-10 bg-background mb-5 flex flex-row justify-between">
        <div>
          <CardTitle className="mb-2">Gatiya</CardTitle>
          <CardDescription>One purpose, one wallet</CardDescription>
        </div>
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          Join by Invite
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {gatiyas.length > 0 ? (
          gatiyas.map((gatiya) => (
            <Card
              key={gatiya.id}
              className="border border-muted shadow-sm bg-background"
            >
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {gatiya.accountName}
                </CardTitle>
                <CardDescription className="text-sm">
                  Balance: {gatiya.remainingBalance} / {gatiya.jointAccountBalance} KWD
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-end justify-between gap-4">
                {/* Avatar Group */}
                <div className="flex -space-x-3 [&>*]:ring [&>*]:ring-background">
                  {gatiya.users.map((user, i) => (
                    <Avatar key={i}>
                      <AvatarFallback>
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {/* Created By */}
                <p className="text-sm text-muted-foreground">
                  Invite Code:{" "}
                  <span className="text-destructive font-semibold">
                    {gatiya.inviteCode}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">
            You are not part of any Gatiya accounts.
          </p>
        )}
      </CardContent>
      <JoinGatiyaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJoinSuccess={handleJoinSuccess}
      />
    </Card>
  );
}
