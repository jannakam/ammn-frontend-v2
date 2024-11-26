"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialFriends = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", avatar: "/avatar.png" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", avatar: "/avatar.png" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", avatar: "/avatar.png" },
  { id: "4", name: "David Lee", email: "david@example.com", avatar: "/avatar.png" },
  { id: "5", name: "Eve Taylor", email: "eve@example.com", avatar: "/avatar.png" },
];

export default function FriendPicklist() {
  const [availableFriends, setAvailableFriends] = React.useState(initialFriends);
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const [selectedFriend, setSelectedFriend] = React.useState(null);
  const [groupName, setGroupName] = React.useState("");
  const [totalBalance, setTotalBalance] = React.useState("");
  const [deductedAmount, setDeductedAmount] = React.useState(null);
  const [showSummary, setShowSummary] = React.useState(false);

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
      alert("Please provide all required details!");
      return;
    }
    setShowSummary(true);
  };

  if (showSummary) {
    return (
      <div className="min-h-[38rem] max-h-[38rem] w-full overflow-scroll p-6">
        <h2 className="text-2xl font-bold mb-4">Gatiya Summary</h2>
        <Card className="w-full max-w-3xl mx-auto p-6">
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between">
                <span className="font-semibold">Gatiya Name:</span>
                <span>{groupName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Balance:</span>
                <span>{totalBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Contributed Amount Per Friend:</span>
                <span>{deductedAmount?.toFixed(2)}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Selected Friends:</h3>
                <ScrollArea className="h-48 pr-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedFriends.map((friend) => (
                      <Card key={friend.id} className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="font-semibold">{friend.name}</p>
                            <p className="text-sm text-muted-foreground">{friend.email}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="flex justify-start">
                <Button variant="outline" onClick={() => setShowSummary(false)}>
                  Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[38rem] max-h-[38rem] w-full overflow-scroll p-6">
      <h2 className="text-2xl font-bold mb-4">Gatiya</h2>
      <div className="flex flex-row gap-8 justify-center items-center mb-8">
        <Card className="w-[20rem] h-[22rem] overflow-scroll">
          <CardHeader className="sticky top-0 z-10 bg-background">
            <CardTitle>Available Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[25rem] pr-4">
              {availableFriends.map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onClick={() => setSelectedFriend(friend)}
                  isSelected={selectedFriend?.id === friend.id}
                />
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex flex-col justify-center space-y-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => selectedFriend && moveToSelected(selectedFriend)}
            disabled={!selectedFriend || selectedFriends.some((f) => f.id === selectedFriend.id)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => selectedFriend && moveToAvailable(selectedFriend)}
            disabled={!selectedFriend || availableFriends.some((f) => f.id === selectedFriend.id)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <Card className="w-[20rem] h-[22rem] overflow-scroll">
          <CardHeader className="sticky top-0 z-10 bg-background">
            <CardTitle>Selected Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[25rem] pr-4">
              {selectedFriends.map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onClick={() => setSelectedFriend(friend)}
                  isSelected={selectedFriend?.id === friend.id}
                />
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

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
        <Button onClick={handleSubmit} className="h-10 w-[10rem]">
          Create
        </Button>
      </div>

      {selectedFriends.length > 0 && totalBalance && (
        <div className="text-center">
          <p>
            The contributed amount for each will be:{" "}
            <strong className="text-destructive">{deductedAmount?.toFixed(2)}</strong>
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
