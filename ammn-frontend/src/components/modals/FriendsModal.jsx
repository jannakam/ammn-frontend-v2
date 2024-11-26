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
  const friends = [
    { name: "Wahab", email: "wahab@example.com", fallback: "JD", badge: "silver" },
    { name: "Nora", email: "nora@example.com", fallback: "JS", badge: "bronze" },
    { name: "Saja", email: "saja@example.com", fallback: "MB", badge: "gold" },
    { name: "Janna", email: "janna@example.com", fallback: "SA", badge: "silver" },
    { name: "Meshal", email: "meshal@example.com", fallback: "SA", badge: "silver" },
    { name: "Yousef", email: "yousif@example.com", fallback: "SA", badge: "silver" },
  ];

  const [email, setEmail] = useState("");
  const [foundName, setFoundName] = useState("");

  const handleSearch = () => {
    const user = friends.find((friend) => friend.email === email);
    setFoundName(user ? user.name : "User not found");
  };

  return (
    
    <div className="min-h-[40rem] max-h-[40rem] w-full overflow-scroll">
      <h2 className="text-lg font-semibold mb-5">Friends</h2>
      
      {/* Email search section */}
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Enter an email"
            className="col-span-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-left">
            Name
          </Label>
          <Input
            id="name"
            value={foundName}
            className="col-span-3"
            readOnly
          />
        </div>
        <Button className="ml-auto" onClick={handleSearch}>
          Find Friend
        </Button>
      </div>

      {/* Friends list */}
      <div className="space-y-4 overflow-scroll">
        <h3 className="text-md font-medium">Friends List</h3>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 border-b last:border-b-0 border-muted rounded-md"
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
