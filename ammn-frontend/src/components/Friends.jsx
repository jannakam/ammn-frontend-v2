import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Friends() {
    const [query, setQuery] = useState("");
  
    const friends = [
      { name: "Wahab", username: "@wahab", fallback: "JD", badge: "silver" },
      { name: "Nora", username: "@nora", fallback: "JS", badge: "bronze" },
      { name: "Saja", username: "@saja", fallback: "MB", badge: "gold" },
      { name: "Janna", username: "@janna", fallback: "SA", badge: "silver" },
    ];
  
    // Filter friends based on the search query
    const filteredFriends = friends.filter(
      (friend) =>
        friend.name.toLowerCase().includes(query.toLowerCase()) ||
        friend.username.toLowerCase().includes(query.toLowerCase())
    );
  
    return (
      <Card className="h-full overflow-scroll z-10 backdrop-blur-lg bg-background/70">
        <CardHeader className="sticky top-0 z-10 bg-background mb-2">
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
            {/* <Button variant="outline" size="sm" className="z-10">
              <PlusIcon />
            </Button> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt={friend.username} />
                  <AvatarFallback>{friend.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-grow">
                  <div className="font-medium">{friend.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {friend.username}
                  </div>
                </div>
                <Badge variant="outline">{friend.badge}</Badge>
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
  