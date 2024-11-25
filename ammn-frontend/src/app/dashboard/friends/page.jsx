// "use client";

// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";

// export default async function Friends() {
//   // Add the friends by email/name to a list to be previod by the user
//   //double check this

//   const [friends, setFriends] = useState([]);
//   const [newFriend, setNewFriend] = useState({ name: " ", email: " " });

//   useEffect(() => {
//     const fetchFriends = async () => {
//       const response = await fetch("http://localhost:3001/dashboard/friends");
//       const friendsData = await response.json();
//       setSource(friendsData);
//     };
//     fetchFriends();
//   }, []);

//   const addFriend = async () => {
//     if (!newFriendByName.name && !newFriend.email)
//       alert("please enter a Name or an email");
//     return;
//   };

//   // POST request to add a new friend
//   const response = await fetch("http://localhost:3001/dashboard/friends", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newFriend),
//   });

//   if (response.ok) {
//     const updatedFriends = await response.json();
//     setFriends(updatedFriends); // Update the list with the new friend
//     setNewFriend({ name: "", email: "" }); // Clear the input fields
//   } else {
//     alert("Failed to add friend. Try again.");
//   }
// }

// return (
//   <div className="flex flex-col justify-center items-center h-screen w-full">
//     <h1 className="text-2xl">FRIENDS LIST</h1>

//     <div className="flex gap-2 mb-4">
//       {/* add by name */}
//       <input
//         type="text"
//         placeholder="Friends Name"
//         value={newFriend.name}
//         onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
//         className="border p-2"
//       />

//       {/* add by email */}
//       <input
//         type="text"
//         placeholder="Friends Email"
//         value={newFriend.email}
//         onChange={(e) => setNewFriend({ ...newFriend, email: e.target.value })}
//         className="border p-2"
//       />

//       <Button onClick={addFriend} className="bg-yellow-300 text-black p-2">
//         Add Friend
//       </Button>

//       <ul>
//         {friends.map((friend) => (
//           <li key={friend.id}>
//             {friend.name} {friend.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );

"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Friends() {
  const [friends, setFriends] = useState([]); // Stores the list of friends
  const [newFriend, setNewFriend] = useState({ name: "", email: "" }); // Stores the input for a new friend

  // Fetch friends when the component mounts
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("http://localhost:3001/dashboard/friends");
        if (!response.ok) throw new Error("Failed to fetch friends");
        const friendsData = await response.json();
        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  // Add a new friend
  const addFriend = async () => {
    // Validation
    if (!newFriend.name && !newFriend.email) {
      alert("Please enter a name or an email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/dashboard/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFriend),
      });

      if (!response.ok) throw new Error("Failed to add friend");

      const updatedFriends = await response.json();
      setFriends(updatedFriends); // Update the list with the new friend
      setNewFriend({ name: "", email: "" }); // Clear the input fields
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to add friend. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="text-2xl">FRIENDS LIST</h1>

      <div className="flex gap-2 mb-4">
        {/* Add friend by name */}
        <input
          type="text"
          placeholder="Friend's Name"
          value={newFriend.name}
          onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
          className="border p-2"
        />

        {/* Add friend by email */}
        <input
          type="text"
          placeholder="Friend's Email"
          value={newFriend.email}
          onChange={(e) => setNewFriend({ ...newFriend, email: e.target.value })}
          className="border p-2"
        />

        {/* Button to add friend */}
        <Button onClick={addFriend} className="bg-yellow-300 text-black p-2">
          Add Friend
        </Button>
      </div>

      {/* Display friends list */}
      <ul>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li key={friend.id} className="py-2">
              {friend.name} ({friend.email})
            </li>
          ))
        ) : (
          <li className="text-muted">No friends available.</li>
        )}
      </ul>
    </div>
  );
}
