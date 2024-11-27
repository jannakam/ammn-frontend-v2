"use client";

import { signup } from "@/actions/auth";
import { AutoForm, AutoFormSubmit } from "@/components/ui/auto-form";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

<<<<<<< HEAD
const formSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required.",
    })
    .min(1, { message: "First name cannot be empty." }),

  lastName: z
    .string({
      required_error: "Last name is required.",
    })
    .min(1, { message: "Last name cannot be empty." }),

  civilId: z
    .string({
      required_error: "Civil ID is required.",
    })
    .regex(/^[0-9]{12}$/, {
      message: "Civil ID must be a 12-digit number.",
    }),

  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({ message: "Invalid email address." }),

  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .regex(/^[0-9]{8}$/, {
      message: "Phone number must be an 8-digit number.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),

  confirm: z
    .string({
      required_error: "Confirm password is required.",
    })
    .min(8, {
      message: "Confirm password must be at least 8 characters.",
    }),
  // .refine((value, ctx) => value === ctx.parent.password, {
  //   message: "Passwords do not match.",
  // }),
});
=======
// Define the form schema
const formSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required.",
      })
      .min(1, { message: "First name cannot be empty." }),

    lastName: z
      .string({
        required_error: "Last name is required.",
      })
      .min(1, { message: "Last name cannot be empty." }),

    civilId: z
      .string({
        required_error: "Civil ID is required.",
      })
      .regex(/^[0-9]{12}$/, {
        message: "Civil ID must be a 12-digit number.",
      }),

    email: z
      .string({
        required_error: "Email is required.",
      })
      .email({ message: "Invalid email address." }),

    phoneNumber: z
      .string({
        required_error: "Phone number is required.",
      })
      .regex(/^[0-9]{8}$/, {
        message: "Phone number must be an 8-digit number.",
      }),

    password: z
      .string({
        required_error: "Password is required.",
      })
      .min(8, {
        message: "Password must be at least 8 characters.",
      }),

    confirm: z.string({
      required_error: "Confirm password is required.",
    }),
  })
  // Validate password and confirm together
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"], // Point the error to the "confirm" field
    message: "Passwords do not match.",
  });
>>>>>>> 85e24f82d0eae8c2b508b29d3b25ea99112dd0db

function RegisterForm() {
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AutoForm
<<<<<<< HEAD
      onSubmit={(signup) => {
        setIsLoading(true);
        const promise = signup(data);

=======
      onSubmit={(data) => {
        setIsLoading(true);

        // Remove the 'confirm' field before sending the data to signup()
        const { confirm, ...filteredData } = data;

        const promise = signup(filteredData);

>>>>>>> 85e24f82d0eae8c2b508b29d3b25ea99112dd0db
        toast.promise(promise, {
          loading: "Registering...",
        });

        promise.then((res) => {
          setIsLoading(false);
          if (!res) {
            toast.error("An error occurred, please try again.");
            setValues({
              ...values,
              password: "",
              confirm: "",
            });
          } else {
            toast.success("Registered successfully.");
            redirect("/dashboard");
          }
        });
      }}
      values={values}
      onValuesChange={setValues}
      className="min-w-[20rem]"
      formSchema={formSchema}
    >
<<<<<<< HEAD
      <AutoFormSubmit className="w-full" disabled={isLoading}>
=======
      <AutoFormSubmit
        className="w-full bg-primary hover:bg-accent"
        disabled={isLoading}
      >
>>>>>>> 85e24f82d0eae8c2b508b29d3b25ea99112dd0db
        {isLoading ? (
          <LoaderCircle className="h-6 w-6 animate-spin" />
        ) : (
          "Sign Up"
        )}
      </AutoFormSubmit>
    </AutoForm>
  );
}

export default RegisterForm;
