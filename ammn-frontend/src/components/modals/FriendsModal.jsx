"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

const FriendsModal = () => {
  const [friends, setFriends] = useState([
    { name: "Wahab", email: "wahab@example.com", fallback: "JD", badge: "silver" },
    { name: "Nora", email: "nora@example.com", fallback: "JS", badge: "bronze" },
    { name: "Saja", email: "saja@example.com", fallback: "MB", badge: "gold" },
    { name: "Janna", email: "janna@example.com", fallback: "SA", badge: "silver" },
    { name: "Meshal", email: "meshal@example.com", fallback: "SA", badge: "silver" },
    { name: "Yousef", email: "yousef@example.com", fallback: "SA", badge: "silver" },
  ]);

  const [email, setEmail] = useState("");
  const [foundName, setFoundName] = useState("");
  const [newFriendName, setNewFriendName] = useState("");

  const handleSearch = () => {
    const user = friends.find((friend) => friend.email === email);
    setFoundName(user ? user.name : "User not found");
  };

  const handleAddFriend = () => {
    if (newFriendName && email) {
      const newFriend = { name: newFriendName, email, fallback: newFriendName[0] + (newFriendName[1] || "") };
      setFriends([...friends, newFriend]);
      setNewFriendName("");
      setEmail("");
    }
  };

  return (
    <div className="min-h-[38rem] max-h-[38rem] w-full overflow-scroll p-6">
      
      {/* Email search and add section */}
      <div className="flex flex-col gap-4 mb-4 sticky top-0 bg-background z-20">
        <h2 className="text-2xl font-bold">Friends</h2>
        <div className="flex flex-col">
          <Label htmlFor="email" className="mb-1 text-left">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Enter an email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="name" className="mb-1 text-left">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Enter name (to add a new friend)"
            className="w-full"
            value={foundName}
            onChange={(e) => setNewFriendName(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={handleSearch} className="flex-1 hover:bg-accent">
            Find Friend
          </Button>
          <Button onClick={handleAddFriend} className="flex-1 hover:bg-accent">
            Add Friend
          </Button>
        </div>
        <h3 className="text-lg font-semibold">Friends List</h3>
      </div>

      {/* Friends list */}
      <div className="space-y-4 overflow-scroll">
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border-b last:border-b-0 border-muted rounded-md"
            >
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt={friend.email} />
                <AvatarFallback>{friend.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-grow">
                <div className="font-medium">{friend.name}</div>
                <div className="text-sm text-muted-foreground">
                  {friend.email}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsModal;
