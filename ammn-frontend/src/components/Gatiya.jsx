import * as React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Gatiya() {
  const [gatiyas, setGatiyas] = React.useState([]);

  const loadGatiyas = () => {
    const storedGatiyas = JSON.parse(localStorage.getItem("gatiyas")) || [];
    setGatiyas(storedGatiyas);
  };

  React.useEffect(() => {
    loadGatiyas();
    const handleGatiyaUpdated = () => loadGatiyas();
    window.addEventListener("gatiya-updated", handleGatiyaUpdated);
    return () => {
      window.removeEventListener("gatiya-updated", handleGatiyaUpdated);
    };
  }, []);

  return (
    <Card className="h-full overflow-scroll backdrop-blur-lg bg-background/40">
      <CardHeader className="sticky top-0 z-10 bg-background mb-5 flex flex-row justify-between">
        <div>
          <CardTitle className="mb-2">Gatiya</CardTitle>
          <CardDescription>One purpose, one wallet</CardDescription>
        </div>
        <Button variant="outline">Join by Invite</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {gatiyas.map((gatiya, index) => (
          <Card
            key={index}
            className="border border-muted shadow-sm bg-background"
          >
            <CardHeader>
              <CardTitle className="text-lg font-medium">{gatiya.name}</CardTitle>
              <CardDescription className="text-sm">
                Balance: {gatiya.remaining} / {gatiya.initial} KWD
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-4">
              <div className="flex -space-x-3 [&>*]:ring [&>*]:ring-background">
                {gatiya.people.map((src, i) => (
                  <Avatar key={i}>
                    <AvatarImage src={src} />
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Created By:{" "}
                <span className="text-destructive font-semibold">{gatiya.created}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
