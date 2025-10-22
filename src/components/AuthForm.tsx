"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface Props {
  type: "Sign In" | "Sign Up";
}

const fields = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Your User Name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@email.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Your Password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm Your Password",
  },
];

const signupSchema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Email must be valid"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const signinSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email must be valid"),
  password: z.string().nonempty("Password is required"),
});

const AuthForm = ({ type }: Props) => {
  const formSchema = type === "Sign In" ? signinSchema : signupSchema;
  const defaultValues =
    type === "Sign In"
      ? { email: "", password: "" }
      : { username: "", email: "", password: "", confirmPassword: "" };
  type FieldName = keyof typeof defaultValues;
  type FormValues = z.infer<typeof signinSchema> | z.infer<typeof signupSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const formData = {
    title: type === "Sign In" ? "Welcome back!" : "Welcome aboard!",
    description:
      type === "Sign In"
        ? "Continue tending to your pacthes and yourself"
        : "Grow pacthes that take care of you",
    option: type === "Sign In" ? "Not a Pacther yet?" : "Already a Patcher?",
  };

  function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="h5">{formData.title}</CardTitle>
        <CardDescription>{formData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-2">
            {fields
              .filter((f) => f.name in defaultValues)
              .map((inputField) => {
                type FieldName = keyof typeof defaultValues;
                const name = inputField.name as FieldName;

                return (
                  <Controller
                    key={name}
                    name={name}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        data-invalid={fieldState.invalid}
                        className="gap-2"
                      >
                        <FieldLabel htmlFor={`${type}-${name}`}>
                          {inputField.label}
                        </FieldLabel>
                        <Input
                          {...field}
                          type={inputField.type} // use correct type from fields array
                          id={`${type}-${name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder={inputField.placeholder}
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                );
              })}

            {type === "Sign In" && (
              <Field orientation="horizontal">
                <Button type="button" variant="link">
                  Forgot password
                </Button>
              </Field>
            )}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <FieldGroup>
          <Field orientation="horizontal" className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              {type}
            </Button>
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="sign-up">{formData.option}</FieldLabel>
            <Button type="button" variant="link">
              {type === "Sign In" ? "Sign Up" : "Sign In"}
            </Button>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
