"use client";

<<<<<<< HEAD
import { login } from "@/actions/auth";
=======
>>>>>>> 85e24f82d0eae8c2b508b29d3b25ea99112dd0db
import { AutoForm, AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LoaderCircle } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
<<<<<<< HEAD
=======
import { login } from "@/actions/auth";
>>>>>>> 85e24f82d0eae8c2b508b29d3b25ea99112dd0db
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Username is required.",
    })
    .min(3, {
      message: "Username must be at least 3 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(4, {
      message: "Password must be at least 4 characters.",
    }),
});

function LoginForm() {
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  return (
    <>
      <AutoForm
        onSubmit={(data) => {
          setIsLoading(true);
          const promise = login(data);

          toast.promise(promise, {
            loading: "Logging in...",
          });

          promise.then((res) => {
            setIsLoading(false);
            if (!res) {
              toast.error(
                "Username or password is incorrect, please try again."
              );
              setValues({
                ...values,
                password: "",
              });
            } else {
              toast.success("Logged in successfully.");
              redirect(redirectUrl);
            }
          });
        }}
        values={values}
        onValuesChange={setValues}
        className={"min-w-[20rem]"}
        formSchema={formSchema}
        fieldConfig={{
          password: {
            inputProps: {
              type: "password",
              // placeholder: '••••••••',
            },
          },
        }}
      >
<<<<<<< HEAD
        <AutoFormSubmit className={"w-full"} disabled={isLoading}>
=======
        <AutoFormSubmit
          className={"w-full bg-primary hover:bg-accent"}
          disabled={isLoading}
        >
>>>>>>> 85e24f82d0eae8c2b508b29d3b25ea99112dd0db
          {isLoading ? (
            <LoaderCircle className="h-6 w-6 animate-spin" />
          ) : (
            "Log In"
          )}
        </AutoFormSubmit>
      </AutoForm>
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs uppercase text-muted-foreground/[.4]">or</span>
        <Separator className="flex-1" />
      </div>
      <Button
        variant="outline"
        className="w-full gap-3"
        onClick={() => {
          toast("You didn't think this would actually work, did you?", {
            action: {
              label: ":(",
            },
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
          fill="currentColor"
        >
          <path
            d="M44.5 20H24v8.5h11.7C33.1 33.3 28.8 36 24 36c-6 0-11-4-12.8-9.4L4.8 31c2.8 7.6 10.3 13 19.2 13 9.8 0 18.3-6.6 20.9-15.5.4-1.3.6-2.6.6-4 0-1.1-.1-2.2-.4-3.2H44.5z"
            fill="#34A853"
          />
          <path
            d="M24 12c4.3 0 8.1 1.6 11 4.2l6.3-6.3C37.4 6 31.2 4 24 4 14.7 4 6.7 9.4 4 17.2l6.4 5C12.8 15.8 17.9 12 24 12z"
            fill="#EA4335"
          />
          <path
            d="M4 17.2C2.9 20.3 2.9 23.8 4 26.8l6.4-5C9.6 20.6 9.4 19.3 9.4 18c0-1.3.2-2.6.5-3.8L4 17.2z"
            fill="#FBBC04"
          />
          <path
            d="M44.5 20c.3 1 .5 2 .5 3.2 0 1.3-.2 2.6-.5 4H24v-8.5h20.5z"
            fill="#4285F4"
          />
        </svg>
        <span>Login with Google</span>
      </Button>
    </>
  );
}

export default LoginForm;
