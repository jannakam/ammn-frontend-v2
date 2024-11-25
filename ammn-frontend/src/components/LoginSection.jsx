import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";

export default function LoginSection({ toggleToRegister }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Log in to your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?
          <Button
            variant="link"
            size="sm"
            className="px-1 text-muted-foreground"
            onClick={toggleToRegister}
          >
            Register now!
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
