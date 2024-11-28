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

  return (
    <Card className="h-full w-full overflow-y-auto overflow-x-hidden z-10 backdrop-blur-lg bg-background/70">
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
        </div>
      </CardHeader>
      <CardContent className="space-y-4 overflow-x-hidden">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            <div key={index} className="flex flex-row items-start gap-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder-user.jpg"
                  alt={friend.firstName + " " + friend.lastName}
                />
                <AvatarFallback>
                  {friend.firstName.charAt(0)}
                  {friend.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-grow break-all">
                <div className="text-md text-muted-foreground">
                  {friend.firstName + " " + friend.lastName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {friend.email}
                </div>
              </div>
              {/* Uncomment if you want to use the badge
              <Badge variant="outline">{friend.badge}</Badge>
              */}
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
