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
  const gatiyas = [
    {
      name: "Gift for Saja",
      initial: 2000,
      remaining: 400,
      people: ["/avatar.png", "/avatar.png", "/avatar.png"],
      created: "Wahab",
    },
    {
      name: "Lunch with Wahab",
      initial: 50,
      remaining: 50,
      people: ["/avatar2.png", "/avatar2.png", "/avatar2.png"],
      created: "Janna",
    },
  ];

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
              <CardTitle className="text-lg font-medium">
                {gatiya.name}
              </CardTitle>
              <CardDescription className="text-sm">
                Balance: {gatiya.remaining} / {gatiya.initial} KWD
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-4">
              {/* Avatar Group */}
              <div className="flex -space-x-3 [&>*]:ring [&>*]:ring-background">
                {gatiya.people.map((src, i) => (
                  <Avatar key={i}>
                    <AvatarImage src={src} />
                  </Avatar>
                ))}
              </div>
              {/* Created By */}
                <p className="text-sm text-muted-foreground">
                    Created By: <span className="text-destructive font-semibold">{gatiya.created}</span>
                </p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
