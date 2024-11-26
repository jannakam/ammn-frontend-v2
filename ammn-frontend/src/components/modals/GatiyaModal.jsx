"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialFriends = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/avatar.png",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/avatar.png",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "/avatar.png",
  },
  {
    id: "4",
    name: "David Lee",
    email: "david@example.com",
    avatar: "/avatar.png",
  },
  {
    id: "5",
    name: "Eve Taylor",
    email: "eve@example.com",
    avatar: "/avatar.png",
  },
];

export default function FriendPicklist() {
  const [availableFriends, setAvailableFriends] = React.useState(initialFriends);
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const [selectedFriend, setSelectedFriend] = React.useState(null);
  const [groupName, setGroupName] = React.useState("");
  const [totalBalance, setTotalBalance] = React.useState("");
  const [deductedAmount, setDeductedAmount] = React.useState(null);

  const moveToSelected = (friend) => {
    setSelectedFriends([...selectedFriends, friend]);
    setAvailableFriends(availableFriends.filter((f) => f.id !== friend.id));
    setSelectedFriend(null);
  };

  const moveToAvailable = (friend) => {
    setAvailableFriends([...availableFriends, friend]);
    setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
    setSelectedFriend(null);
  };

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
    setGroupName("");
    setTotalBalance("");
    setSelectedFriends([]);
  };

  return (
    <div className="min-h-[38rem] max-h-[38rem] w-full overflow-scroll p-6">
      <h2 className="text-2xl font-bold mb-4">Gatiya</h2>
      <div className="flex flex-row gap-8 justify-center items-center mb-8">
        {/* Available Friends List */}
        <Card className="w-[20rem] h-[25rem] overflow-scroll">
          <CardHeader className="sticky top-0 z-10 bg-background">
            <CardTitle>Available Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[25rem] pr-4">
              {availableFriends.map((friend) => (
                <div key={friend.id}>
                  <FriendCard
                    friend={friend}
                    onClick={() => setSelectedFriend(friend)}
                    isSelected={selectedFriend?.id === friend.id}
                  />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Transfer Buttons */}
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
        <Card className="w-[20rem] h-[25rem] overflow-scroll">
          <CardHeader className="sticky top-0 z-10 bg-background">
            <CardTitle>Selected Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[25rem] pr-4">
              {selectedFriends.map((friend) => (
                <div key={friend.id}>
                  <FriendCard
                    friend={friend}
                    onClick={() => setSelectedFriend(friend)}
                    isSelected={selectedFriend?.id === friend.id}
                  />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Group Name and Balance */}
      <div className="flex flex-row gap-4 items-end justify-center mb-6">
        <div className="flex-1">
          <Label>Gatiya Name</Label>
          <Input
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Gatiya Name"
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Label>Total Gatiya Balance</Label>
          <Input
            id="totalBalance"
            value={totalBalance}
            onChange={(e) => setTotalBalance(e.target.value)}
            placeholder="Enter Total Balance"
            className="w-full"
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="h-10 w-[10rem]"
        >
          Create
        </Button>
      </div>

      {/* Contribution Amount */}
      {selectedFriends.length > 0 && totalBalance && (
        <div className="text-center">
          <p>
            The contributed amount for each will be:{" "}
            <strong className="text-yellow-500">
              {deductedAmount?.toFixed(2)}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}

function FriendCard({ friend, onClick, isSelected }) {
  return (
    <Card
      className={`mb-2 cursor-pointer hover:bg-accent ${
        isSelected ? "bg-accent" : ""
      }`}
      onClick={onClick}
    >
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
