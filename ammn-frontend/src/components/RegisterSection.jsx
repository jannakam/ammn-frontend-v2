import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterSection({ toggleToLogin }) {
  return (
    <Card className="pt-5">
      <CardContent className="grid grid-cols-1">
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
