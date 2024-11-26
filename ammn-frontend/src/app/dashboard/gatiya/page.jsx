"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const initialFriends = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "David Lee",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Eve Taylor",
    email: "eve@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export default function FriendPicklist() {
  const [availableFriends, setAvailableFriends] =
    React.useState(initialFriends);
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const [selectedFriend, setSelectedFriend] = React.useState(null);
  const [groupName, setGroupName] = React.useState("");
  const [totalBalance, setTotalBalance] = React.useState("");
  const [deductedAmount, setDeductedAmount] = React.useState(null);

  const moveToSelected = (friend) => {
    setSelectedFriends([...selectedFriends, friend]);
    setAvailableFriends(availableFriends.filter((f) => f.id !== friend.id));
  };

  const moveToAvailable = (friend) => {
    setAvailableFriends([...availableFriends, friend]);
    setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
  };

  // Calculate the amount deducted from each friend when totalBalance changes
  React.useEffect(() => {
    if (totalBalance && selectedFriends.length > 0) {
      const balance = parseFloat(totalBalance);
      if (!isNaN(balance)) {
        setDeductedAmount(balance / selectedFriends.length);
      } else {
        setDeductedAmount(null);
      }
    } else {
      setDeductedAmount(null);
    }
  }, [totalBalance, selectedFriends]);

  const handleSubmit = () => {
    if (!groupName || !totalBalance || selectedFriends.length === 0) {
      alert("Please provide all required details.");
      return;
    }

    const groupData = {
      groupName,
      totalBalance: parseFloat(totalBalance),
      members: selectedFriends.map((friend) => ({
        id: friend.id,
        name: friend.name,
        contributedAmount: deductedAmount,
      })),
    };

    console.log("Group Created:", groupData);
    alert(`Gatiya "${groupName}" created successfully!`);
    // Reset state
    setGroupName("");
    setTotalBalance("");
    setSelectedFriends([]);
  };

  return (
    <div className="flex flex-row items-start space-x-8 p-4">
      <h1 className="text-2xl text-center mb-8">GATIYA</h1>
      <div className="flex felx-col gap-8 w-1/2">
        <div className="flex flex-row gap-8 w-full max-w-5xl mx-auto flex-1 items-center">
          {/* Available Friends List */}
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle>Available Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {availableFriends.map((friend) => (
                  <Dialog key={friend.id}>
                    <DialogTrigger asChild>
                      <div>
                        <FriendCard
                          friend={friend}
                          onClick={() => setSelectedFriend(friend)}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Friend Details</DialogTitle>
                      </DialogHeader>
                      <FriendDetails friend={friend} />
                      <Button
                        onClick={() => moveToSelected(friend)}
                        className="mt-4"
                      >
                        Add to Selected
                      </Button>
                    </DialogContent>
                  </Dialog>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col justify-center space-y-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => selectedFriend && moveToSelected(selectedFriend)}
            disabled={
              !selectedFriend ||
              selectedFriends.some((f) => f.id === selectedFriend.id)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => selectedFriend && moveToAvailable(selectedFriend)}
            disabled={
              !selectedFriend ||
              availableFriends.some((f) => f.id === selectedFriend.id)
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected Friends List */}
        <Card className="w-[300px]">
          <CardHeader>
            <CardTitle>Selected Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {selectedFriends.map((friend) => (
                <Dialog key={friend.id}>
                  <DialogTrigger asChild>
                    <div>
                      <FriendCard
                        friend={friend}
                        onClick={() => setSelectedFriend(friend)}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Friend Details</DialogTitle>
                    </DialogHeader>
                    <FriendDetails friend={friend} />
                    <Button
                      onClick={() => moveToAvailable(friend)}
                      className="mt-4"
                    >
                      Remove from Selected
                    </Button>
                  </DialogContent>
                </Dialog>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-row gap-8 w-full max-w-5xl mx-auto flex-1 items-center">
        <div className="w-1/2 flex flex-col gap-5">
          {/* Group Name Input */}
          <div>
            <label>Gatiya Name</label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter Gatiya Name"
              className="p-input-sm w-full border border-gray-300 h-10"
            />
          </div>

          {/* Total Balance Input */}
          <div>
            <label>Total Gatiya Balance</label>
            <Input
              id="totalBalance"
              value={totalBalance}
              onChange={(e) => setTotalBalance(e.target.value)}
              placeholder="Enter Total Balance"
              className="p-input-sm w-full border border-gray-300 h-10"
            />
          </div>

          {/* Contribution Amount */}
          {selectedFriends.length > 0 && totalBalance && (
            <div className="mt-4">
              <p>
                The contributed amount for each will be:{" "}
                <strong className="text-yellow-500">
                  {deductedAmount?.toFixed(2)}
                </strong>
              </p>
            </div>
          )}

          {/* Submit Button // the label is not showing */}
          <div className="mt-4 gap-0 text-center">
            <Button
              label="Create Your Gatyia"
              onClick={handleSubmit}
              className="mt- w-full py-2 text-lg text-black "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FriendCard({ friend, onClick }) {
  return (
    <Card className="mb-2 cursor-pointer hover:bg-accent" onClick={onClick}>
      <CardContent className="flex items-center p-4">
        <img
          src={friend.avatar}
          alt={friend.name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{friend.name}</h3>
          <p className="text-sm text-muted-foreground">{friend.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FriendDetails({ friend }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={friend.avatar}
        alt={friend.name}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{friend.name}</h2>
      <p className="text-muted-foreground mb-4">{friend.email}</p>
      <Button>Add to Friends</Button>
    </div>
  );
}
