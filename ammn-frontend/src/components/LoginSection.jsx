import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";

export default function LoginSection({ toggleToRegister }) {
  return (
    <Card className="pt-5">
      <CardContent className="grid gap-4">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
