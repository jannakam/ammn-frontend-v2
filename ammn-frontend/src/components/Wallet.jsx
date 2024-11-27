"use client";

import { useState, useEfect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Forward } from "lucide-react";
import Image from "next/image";

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
      img: "/cards/card1.png",
      isEditing: false,
      transactions: [
        { id: 1, description: "Grocery Shopping", amount: "-50 KWD", date: "2024-11-20" },
        { id: 2, description: "Salary Deposit", amount: "+1,200 KWD", date: "2024-11-15" },
      ],
    },
    {
      name: "Gifts",
      accountNumber: "**** **** **** 9012",
      expirationDate: "8/28",
      img: "/cards/card2.png",
      isEditing: false,
      transactions: [],
    },
    {
      name: "Salary",
      accountNumber: "**** **** **** 3456",
      expirationDate: "7/27",
      img: "/cards/card3.png",
      isEditing: false,
      transactions: [
        { id: 1, description: "Electricity Bill", amount: "-100 KWD", date: "2024-11-18" },
      ],
    },
  ]);

  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null); // Index of the selected account

  const email = "jannakalmuqaisib@gmail.com";
  const balance = "1,287,756 KWD";

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

  const viewHistory = (index) => {
    setSelectedAccountIndex(index);
  };

  const resetHistory = () => {
    setSelectedAccountIndex(null);
  };

  const selectedTransactions =
    selectedAccountIndex !== null ? bankAccounts[selectedAccountIndex].transactions : [];

  return (
    <Card className="h-full bg-none border-none">
      <CardHeader>
        <CardTitle className="text-4xl">Welcome Back!</CardTitle>
      </CardHeader>
      <Card className="h-auto overflow-scroll z-10 backdrop-blur-lg bg-background/70">
        <CardHeader className="bg-background">
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Manage your personal funds</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          <div className="mx-auto p-4">
            <div className="flex items-center justify-end mb-4">
              <Badge variant="secondary">Silver</Badge>
            </div>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-accent">{balance}</div>
              <div className="text-muted-foreground flex items-center justify-center">
                {email}{" "}
                <CopyIcon
                  className="inline-block w-4 h-4 cursor-pointer ml-2"
                  onClick={copyToClipboard}
                />
              </div>
            </div>
            <div>
              <div className="space-y-4">
                {bankAccounts.map((account, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 items-start w-full">
                    <Card className="flex items-center justify-between px-4 py-3 border border-muted rounded-md col-span-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-[120px] h-[80px] overflow-hidden">
                          <Image src={account.img} alt={account.name} width={120} height={80} className="shadow" />
                        </div>
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
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted-foreground text-sm">
                          {account.accountNumber}
                        </div>
                        <div className="text-primary font-medium gap-2 flex justify-between">
                          {account.expirationDate}
                        </div>
                      </div>
                    </Card>
                    <div className="grid grid-rows-2 col-span-2">
                      <Button variant="outline" onClick={() => viewHistory(index)}>
                        View History
                      </Button>
                      <Button variant="outline" onClick={resetHistory}>
                        Reset
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Single Transaction List */}
            <Card className="mt-8 max-h-48 overflow-y-auto">
              <CardHeader>
                <CardTitle>Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTransactions.length === 0 ? (
                  <div className="text-muted-foreground text-sm">No transactions available.</div>
                ) : (
                  <ul>
                    {selectedTransactions.map((transaction) => (
                      <li key={transaction.id} className="mb-2">
                        <div className="font-semibold">{transaction.description}</div>
                        <div className="text-muted-foreground text-sm">
                          {transaction.amount} - {transaction.date}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
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
