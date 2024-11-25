"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Wallet() {
  const { toast } = useToast();

  const [bankAccounts, setBankAccounts] = useState([
    {
      name: "Savings",
      accountNumber: "**** **** **** 1234",
      expirationDate: "5/25",
      img: "/images/savings.png",
      isEditing: false,
    },
    {
      name: "Gifts",
      accountNumber: "**** **** **** 9012",
      expirationDate: "8/28",
      img: "/images/gifts.png",
      isEditing: false,
    },
    {
      name: "Salary",
      accountNumber: "**** **** **** 3456",
      expirationDate: "7/27",
      img: "/images/salary.png",
      isEditing: false,
    },
  ]);

  const email = "jannakalmuqaisib@gmail.com";

  const toggleEdit = (index) => {
    const updatedAccounts = bankAccounts.map((account, i) =>
      i === index ? { ...account, isEditing: !account.isEditing } : account
    );
    setBankAccounts(updatedAccounts);
  };

  const handleChange = (index, newName) => {
    const updatedAccounts = bankAccounts.map((account, i) =>
      i === index ? { ...account, name: newName } : account
    );
    setBankAccounts(updatedAccounts);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    toast({
      description: "Email copied to clipboard!",
    });
  };

  return (
    <Card className="h-full overflow-scroll">
      <CardHeader>
        <CardTitle>Wallet</CardTitle>
        <CardDescription>Manage your personal funds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-end mb-4">
            <Badge variant="secondary">Silver</Badge>
          </div>
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-primary">1,287,756 KWD</div>
            <div className="text-muted-foreground flex items-center justify-center">
              {email}{" "}
              <CopyIcon
                className="inline-block w-4 h-4 cursor-pointer ml-2"
                onClick={copyToClipboard}
              />
            </div>
          </div>
          <div className="flex justify-center space-x-2 mb-4">
            <Button variant="outline">Receive</Button>
            <Button variant="outline">Send</Button>
          </div>
          <div>
            <div className="space-y-4">
              {bankAccounts.map((account, index) => (
                <Card
                  key={index}
                  className="flex items-center justify-between px-4 py-3 border border-muted rounded-md"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={account.img} alt={account.name} />
                      <AvatarFallback>{account.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2">
                      {account.isEditing ? (
                        <input
                          type="text"
                          value={account.name}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onBlur={() => toggleEdit(index)}
                          autoFocus
                          className="bg-transparent text-base font-semibold outline-none border-muted"
                        />
                      ) : (
                        <div
                          className="font-semibold cursor-pointer flex items-center gap-1"
                          onClick={() => toggleEdit(index)}
                        >
                          {account.name}
                          <Pencil className="w-3 h-3 ml-1 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground text-sm">
                      {account.accountNumber}
                    </div>
                    <div className="text-primary font-medium">
                      {account.expirationDate}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
