"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { depositMoney, withdrawMoney } from "@/actions/transactions";
import { useToast } from "@/hooks/use-toast";

export function WalletActionsModal({ bankAccounts, onTransactionSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("deposit");
  const [selectedBankAccount, setSelectedBankAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleTransaction = async () => {
    if (!selectedBankAccount || !amount || isNaN(parseFloat(amount))) {
      toast({
        description: "Please fill in all fields with valid values.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const amountValue = parseFloat(amount);
      let success = false;

      if (transactionType === "deposit") {
        success = await depositMoney({ amount: amountValue });
      } else {
        success = await withdrawMoney({ amount: amountValue });
      }

      if (success) {
        toast({
          description: `${transactionType === "deposit" ? "Deposit" : "Withdrawal"} successful!`,
        });
        // Close the modal and reset the form
        setIsOpen(false);
        setTransactionType("deposit");
        setSelectedBankAccount("");
        setAmount("");
        if (onTransactionSuccess) {
          onTransactionSuccess();
        }
      } else {
        toast({
          description: `${transactionType === "deposit" ? "Deposit" : "Withdrawal"} failed.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast({
        description: "Transaction failed.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Wallet Actions
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit into or withdraw from your wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 pb-4">
            <div>
              <Label>Transaction Type</Label>
              <Select
                value={transactionType}
                onValueChange={(value) => setTransactionType(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="withdraw">Withdraw</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Bank Account</Label>
              <Select
                value={selectedBankAccount}
                onValueChange={(value) => setSelectedBankAccount(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select bank account" />
                </SelectTrigger>
                <SelectContent>
                  {bankAccounts.map((account, index) => (
                    <SelectItem key={index} value={account.name}>
                      {account.name} ({account.accountNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTransaction} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
