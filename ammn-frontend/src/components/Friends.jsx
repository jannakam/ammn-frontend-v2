import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllUsers } from "@/actions/users";

export function Friends() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]); // State to store fetched users
  const [isLoading, setIsLoading] = useState(false); // State for loading

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true); // Start loading
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers); // Set fetched users to state
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false); // Stop loading
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

  const friendszzzz = [
    { name: "Wahab", username: "@wahab", fallback: "JD", badge: "silver" },
    { name: "Nora", username: "@nora", fallback: "JS", badge: "bronze" },
    { name: "Saja", username: "@saja", fallback: "MB", badge: "gold" },
    { name: "Janna", username: "@janna", fallback: "SA", badge: "silver" },
  ];

  // Filter friends based on the search query
  // const filteredFriends = friends.filter(
  //   (friend) =>
  //     friend.name.toLowerCase().includes(query.toLowerCase()) ||
  //     friend.username.toLowerCase().includes(query.toLowerCase())
  // );

  return (
    <Card className="h-full overflow-scroll z-10 backdrop-blur-lg bg-background/70">
      <CardHeader className="sticky top-0 z-10 bg-background mb-5">
        <CardTitle>Friends</CardTitle>
        <CardDescription>Find and add friends</CardDescription>
        <div className="flex flex-row gap-2">
          <Input
            type="text"
            placeholder="Search friends..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="relative z-10 active:border-primary"
          />
          <Button variant="outline" size="sm" className="z-10">
            <PlusIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            <div key={index} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder-user.jpg"
                  alt={friend.firstName + friend.lastName}
                />
                <AvatarFallback>{friend.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-grow">
                <div className="font-medium">{friend.name}</div>
                <div className="text-sm text-muted-foreground">
                  {friend.firstName + friend.lastName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {friend.email}
                </div>
              </div>
              {/* <Badge variant="outline">{friend.badge}</Badge> */}
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            No friends found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
