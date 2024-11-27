"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Forward, X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getWallet } from "@/actions/users";
import { getAllUsers } from "@/actions/users";
import { myTransactions } from "@/actions/transactions";
import clsx from "clsx";

export function Wallet() {
  const { toast } = useToast();
  const [showTransactions, setShowTransactions] = useState(false);
  const [showWalletTransactions, setShowWalletTransactions] = useState(false);
  const [walletTransactions, setWalletTransactions] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [bankAccounts, setBankAccounts] = useState([
    {
      name: "Savings",
      accountNumber: "**** **** **** 1234",
      expirationDate: "5/25",
      img: "/cards/card1.png",
      isEditing: false,
      transactions: [
        {
          id: 1,
          description: "Grocery Shopping",
          amount: "-50 KWD",
          date: "2024-11-20",
        },
        {
          id: 2,
          description: "Salary Deposit",
          amount: "+1,200 KWD",
          date: "2024-11-15",
        },
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
        {
          id: 1,
          description: "Electricity Bill",
          amount: "-100 KWD",
          date: "2024-11-18",
        },
      ],
    },
  ]);

  useEffect(() => {
    const fetchWallet = async () => {
      setIsLoading(true);
      try {
        const fetchedWallet = await getWallet();
        setWallet(fetchedWallet);
      } catch (error) {
        console.error("Error fetching wallet:", error);
        toast({
          description: "Failed to load wallet data.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallet();
  }, [toast]);


  const fetchWalletTransactions = async () => {
    try {
      const transactions = await myTransactions();
      setWalletTransactions(transactions);
    } catch (error) {
      console.error("Error fetching wallet transactions:", error);
      toast({
        description: "Failed to load wallet transactions.",
      });
    }
  };

  const toggleWalletTransactions = async () => {
    if (!showWalletTransactions) {
      await fetchWalletTransactions();
    }
    setShowWalletTransactions(!showWalletTransactions);
    setShowTransactions(false); // Ensure CardTransactions is hidden
  };
  
  const toggleTransactions = (account) => {
    setSelectedAccount(account);
    setShowTransactions(!showTransactions);
    setShowWalletTransactions(false); // Ensure WalletTransactions is hidden
  };
  

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
    if (wallet?.user?.email) {
      navigator.clipboard.writeText(wallet.user.email);
      toast({
        description: "Email copied to clipboard!",
      });
    }
  };



  if (isLoading) {
    return (
      <Card className="h-auto bg-none border-none">
        <CardContent className="flex items-center justify-center h-auto">
          <div className="text-center text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!wallet) {
    return (
      <Card className="h-auto bg-none border-none">
        <CardContent className="flex items-center justify-center h-auto">
          <div className="text-center text-muted-foreground">
            No wallet data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    
        <div>
          <div className="text-4xl font-bold lg:text-4xl mb-8 sticky top-0 welcome-back m-2">
            Welcome Back,{" "}
            <span className="text-destructive">{wallet.user.firstName}!</span>
          </div>

            <Card className="z-10 backdrop-blur-lg bg-background/40 overflow-hidden">
              <CardHeader className="bg-background mb-5">
                <CardTitle>Wallet</CardTitle>
                <CardDescription>Manage your personal funds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mx-auto p-4">
                  <div className="flex items-center justify-end mb-4">
                    <Badge variant="secondary">Silver</Badge>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-accent">
                      {wallet.balance.toLocaleString()} KWD
                    </div>
                    <div className="text-muted-foreground flex items-center justify-center mb-4">
                      {wallet.user.email}{" "}
                      <CopyIcon
                        className="inline-block w-4 h-4 cursor-pointer ml-2"
                        onClick={copyToClipboard}
                      />
                    </div>
                    <div className="flex flex-row justify-between items-end">
                      <TransferDialog bankAccounts={bankAccounts} />

                      <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleWalletTransactions}
                      >
                        {showWalletTransactions ? "Hide" : "View"} Wallet Transactions
                      </Button>

                      <Button
                        disabled={selectedAccount === null}
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTransactions(selectedAccount)}
                      >
                        {showTransactions ? "Hide" : "View"} Card Transactions
                      </Button>
                      </div>


                    </div>
                  </div>

                  <div>
                    <div
                      className={`flex justify-between ${showTransactions || showWalletTransactions ? "space-x-2" : ""}`}
                    >
                      <div
                        className={`space-y-4 ${
                          showTransactions || showWalletTransactions ? "w-1/2" : "w-full"
                        }`}
                      >
                        <ScrollArea className="h-auto">
                          {bankAccounts.map((account, index) => (
                            <Card
                              onClick={() => {
                                selectedAccount === account
                                  ? setSelectedAccount(null)
                                  : setSelectedAccount(account);
                              }}
                              key={index}
                              className={clsx(
                                "flex items-center justify-between p-4 border border-muted rounded-md",
                                selectedAccount === account && "bg-accent/20"
                              )}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="w-[120px] h-[80px] overflow-hidden">
                                  <Image
                                    src={account.img}
                                    alt={account.name}
                                    width={120}
                                    height={80}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  {account.isEditing ? (
                                    <input
                                      type="text"
                                      value={account.name}
                                      onChange={(e) =>
                                        handleChange(index, e.target.value)
                                      }
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
                                <div className="text-primary font-medium gap-2 flex justify-between">
                                  {account.expirationDate}
                                </div>
                              </div>
                            </Card>
                          ))}
                        </ScrollArea>
                      </div>

                      {/* Transaction List */}
                  {(showTransactions || showWalletTransactions) && (
                    <div className="w-1/2">
                      {showWalletTransactions && !showTransactions && (
                        <WalletTransactions
                          transactions={walletTransactions}
                          onClose={() => setShowWalletTransactions(false)}
                        />
                      )}
                      {showTransactions && !showWalletTransactions && selectedAccount && (
                        <CardTransactions
                          account={selectedAccount}
                          onClose={() => setShowTransactions(false)}
                        />
                      )}
                    </div>
                  )}

                  
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

function TransferDialog({ bankAccounts }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to control the dialog open/close

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredFriends = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Transfer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
          <DialogDescription>Transfer funds between accounts</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="sender">Sender</Label>
            <Select>
              <SelectTrigger id="sender">
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bankAccounts.map((account, index) => (
                    <SelectItem key={index} value={account.name}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="recipient">Recipient</Label>
            <Select>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {filteredFriends.map((friend, index) => (
                    <SelectItem key={index} value={friend.id}>
                      {`${friend.firstName} ${friend.lastName}`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input type="number" id="amount" placeholder="Enter amount" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}> {/* Close modal on cancel */}
            Cancel
          </Button>
          <Button type="submit">Transfer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CardTransactions({ account, onClose }) {
  return (
    <Card className="w-auto h-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{account.name} Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="size-auto">
          {account.transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <div>
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-muted-foreground">
                  {transaction.date}
                </div>
              </div>
              <div
                className={`font-medium ${
                  transaction.amount.startsWith("+")
                    ? "text-accent"
                    : "text-destructive"
                }`}
              >
                {transaction.amount}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}


export function WalletTransactions({ transactions, onClose }) {
  return (
    <Card className="w-auto h-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Wallet Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="size-auto">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <div>
                <div className="text-sm text-muted-foreground">
                  {transaction.type}
                </div>
              </div>
              <div
                className={`font-medium ${
                  transaction.type.includes("Deposit" || "Transfer")
                    ? "text-accent"
                    : "text-destructive"
                }`}
              >
                {transaction.type.includes("Deposit" || "Transfer")
                    ? "+"
                    : "-"}{transaction.amount}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}