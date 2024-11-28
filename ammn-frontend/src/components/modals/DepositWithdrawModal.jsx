import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  addFundsToGityaAccount,
  takeFundsfromGityaAccount,
} from "@/actions/transactions";

export function DepositWithdrawModal({
  isOpen,
  onClose,
  gatiya,
  onTransactionSuccess,
}) {
  const [transactionType, setTransactionType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransaction = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        gatiyaAccountId: gatiya.id,
        amount: parseFloat(amount),
      };

      let updatedGatiya;
      if (transactionType === "deposit") {
        updatedGatiya = await addFundsToGityaAccount(data);
      } else {
        updatedGatiya = await takeFundsfromGityaAccount(data);
      }

      onTransactionSuccess(updatedGatiya);
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Transaction failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit or Withdraw</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div>
            <Label>Transaction Type</Label>
            <Select
              value={transactionType}
              onValueChange={(value) => setTransactionType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
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
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleTransaction} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
