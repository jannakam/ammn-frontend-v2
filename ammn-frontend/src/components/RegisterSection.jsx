import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterSection({ toggleToLogin }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>Register for your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1">
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Already have an account?
          <Button
            variant="link"
            size="sm"
            className="px-1 text-muted-foreground"
            onClick={toggleToLogin}
          >
            Log in here.
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
