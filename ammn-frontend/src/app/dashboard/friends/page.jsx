"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default async function Friends() {
  // Add the friends by email/name to a list to be previod by the user
  //double check this

  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({ name: " ", email: " " });

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch("http://localhost:3000/dashboard/friends");
      const friendsData = await response.json();
      setSource(friendsData);
    };
    fetchFriends();
  }, []);

  const addFriend = async () => {
    if (!newFriendByName.name && !newFriend.email)
      alert("please enter a Name or an email");
    return;
  };

  // POST request to add a new friend
  const response = await fetch("http://localhost:3000/dashboard/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFriend),
  });

  if (response.ok) {
    const updatedFriends = await response.json();
    setFriends(updatedFriends); // Update the list with the new friend
    setNewFriend({ name: "", email: "" }); // Clear the input fields
  } else {
    alert("Failed to add friend. Try again.");
  }
}

return (
  <div className="flex flex-col justify-center items-center h-screen w-full">
    <h1 className="text-2xl">FRIENDS LIST</h1>

    <div className="flex gap-2 mb-4">
      {/* add by name */}
      <input
        type="text"
        placeholder="Friends Name"
        value={newFriend.name}
        onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
        className="border p-2"
      />

      {/* add by email */}
      <input
        type="text"
        placeholder="Friends Email"
        value={newFriend.email}
        onChange={(e) => setNewFriend({ ...newFriend, email: e.target.value })}
        className="border p-2"
      />

      <Button onClick={addFriend} className="bg-yellow-300 text-black p-2">
        Add Friend
      </Button>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.name} {friend.email}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
