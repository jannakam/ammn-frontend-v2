"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { myTransactions } from "@/actions/transactions";

export function Salifny() {
  const [transactions, setTransactions] = React.useState([]);

  // Fetch transactions on component mount
  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const allTransactions = await myTransactions(); // Fetch transactions using your function
        const filteredTransactions = allTransactions.filter(
          (transaction) =>
            transaction.type === "TaslefaTo" || transaction.type === "Taslefa"
        );
        setTransactions(filteredTransactions); // Set filtered transactions in state
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Card className="h-full relative z-10 overflow-scroll backdrop-blur-lg bg-background/40">
      <CardHeader className="bg-background mb-5">
        <CardTitle>Salifny</CardTitle>
        <CardDescription>
          View and manage your transactions with ease.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Transaction Details */}
            <div className="flex flex-col flex-grow">
              {/* Display recipient's full name */}
              <div className="font-md">{`${transaction.firstName} ${transaction.lastName}`}</div>
              {/* Display recipient's email */}
              <div className="text-sm text-muted-foreground">
                {transaction.userEmail}
              </div>
              {/* Display transaction amount */}
              <div className="text-sm text-muted-foreground">
                {transaction.amount} KWD
              </div>
            </div>

            {/* Due Date */}
            <div className="text-sm text-muted-foreground">
              Due by: {transaction.date}
            </div>

            {/* Status Button */}
            <Button
              variant="secondary"
              size="sm"
              className={
                transaction.type === "TaslefaTo"
                  ? "bg-accent"
                  : "bg-destructive"
              }
            >
              {transaction.type === "TaslefaTo" ? "Pay" : "Ping"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
