"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { signupSchema } from "@/schemas/auth";
import Link from "next/link";
import InputField from "./InputField";
import signUpUser from "@/services/auth/signup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = signupSchema;

const FORM_TEXT = {
  title: "Welcome aboard!",
  description: "Grow patches that take care of you",
  option: "Already a Patcher?",
  redirect: "/signin",
  redirectText: "Sign In",
};

type FormValues = z.infer<typeof formSchema>;

const FIELDS: {
  name: keyof FormValues;
  label: string;
  type: string;
  placeholder: string;
}[] = [
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

const SignupForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const userData = signUpUser(data);

    if (userData !== null) {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.email,
        password: data.password,
      });

      if (result?.ok && router) {
        router.push("/");
      }
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="h5">{FORM_TEXT.title}</CardTitle>
        <CardDescription>{FORM_TEXT.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="auth-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-2">
            {FIELDS.map((inputField) => (
              <InputField
                key={inputField.name}
                control={form.control}
                name={inputField.name}
                label={inputField.label}
                type={inputField.type}
                placeholder={inputField.placeholder}
              />
            ))}
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
            <Button type="submit" form="auth-form">
              Sign Up
            </Button>
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="sign-up">{FORM_TEXT.option}</FieldLabel>
            <Button type="button" variant="link">
              <Link href={FORM_TEXT.redirect}>{FORM_TEXT.redirectText}</Link>
            </Button>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
