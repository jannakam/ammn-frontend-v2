import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  
  export function Salifny() {
    const salaf = [
      { name: "Janna", amount: 2000, date: "5/25", fallback: "SA", status: "Pay" },
      { name: "Nora", amount: 50, date: "6/26", fallback: "SA", status: "Ping" },
    ];
  
    return (
      <Card className="h-full relative z-10 overflow-scroll backdrop-blur-lg bg-background/40"> 
        <CardHeader className="bg-background mb-5">
          <CardTitle>Salifny</CardTitle>
          <CardDescription>
            Request money from friends and family with ease.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {salaf.map((friend, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex flex-col flex-grow">
                <div className="font-md">{friend.name}</div>
                <div className="text-sm text-muted-foreground">
                  {friend.amount} KWD
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Due by: {friend.date}</div>
              <Button
                variant="secondary"
                size="sm"
                className={friend.status === "Pay" ? "bg-accent" : "bg-destructive"}
              >
                {friend.status}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  