"use client";

import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

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

import getDefaultValues from "@/utils/auth/generateDefaults";
import { authSchemas, AuthMap } from "@/schemas/auth";

// Form props
type Props<T extends keyof AuthMap> = {
  type: T;
  onSubmit: (data: AuthMap[T]) => void;
};

// Fields definition (all possible fields)
const FIELDS = [
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

// Text per form type
const FORM_TEXT = {
  signin: {
    title: "Welcome back!",
    description: "Continue tending to your pacthes and yourself",
    option: "Not a Pacther yet?",
    redirect: "/signup",
    redirectText: "Sign Up",
  },
  signup: {
    title: "Welcome aboard!",
    description: "Grow pacthes that take care of you",
    option: "Already a Patcher?",
    redirect: "/signin",
    redirectText: "Sign In",
  },
};

const AuthForm = <T extends keyof AuthMap>({ type, onSubmit }: Props<T>) => {
  const schema = authSchemas[type];

  // UseForm with strict typing from schema

  // const handle: SubmitHandler<AuthMap[T]> = (data) => {
  //   onSubmit(data);
  // };

  // Only render fields present in the schema
  const schemaKeys = Object.keys(schema.shape) as (keyof AuthMap[T])[];

  // return (
  //   <Card className="w-full sm:max-w-md">
  //     <CardHeader>
  //       <CardTitle className="h5">{FORM_TEXT[type].title}</CardTitle>
  //       <CardDescription>{FORM_TEXT[type].description}</CardDescription>
  //     </CardHeader>
  //     <CardContent>
  //       <form id="auth-form" onSubmit={form.handleSubmit(handle)}>
  //         <FieldGroup className="gap-2">
  //           {/* {FIELDS.filter((f) =>
  //             schemaKeys.includes(f.name as keyof AuthMap[T])
  //           ).map((inputField) => {
  //             const name = inputField.name as keyof AuthMap[T];
  //             return (
  //               <Controller
  //                 key={name as string}

  //                 control={form.control}
  //                 render={({ field, fieldState }) => (
  //                   <Field data-invalid={fieldState.invalid} className="gap-2">
  //                     <FieldLabel htmlFor={`${type}-${name}`}>
  //                       {inputField.label}
  //                     </FieldLabel>
  //                     <Input
  //                       {...field}
  //                       type={inputField.type}
  //                       id={`${type}-${name}`}
  //                       aria-invalid={fieldState.invalid}
  //                       placeholder={inputField.placeholder}
  //                       autoComplete="off"
  //                     />
  //                     {fieldState.invalid && (
  //                       <FieldError errors={[fieldState.error]} />
  //                     )}
  //                   </Field>
  //                 )}
  //               />
  //             );
  //           })} */}

  //           {type === "signin" && (
  //             <Field orientation="horizontal">
  //               <Button type="button" variant="link">
  //                 Forgot password
  //               </Button>
  //             </Field>
  //           )}
  //         </FieldGroup>
  //       </form>
  //     </CardContent>
  //     <CardFooter>
  //       <FieldGroup>
  //         <Field orientation="horizontal" className="gap-2">
  //           <Button
  //             type="button"
  //             variant="outline"
  //             onClick={() => form.reset()}
  //           >
  //             Reset
  //           </Button>
  //           <Button type="submit" form="auth-form">
  //             {type}
  //           </Button>
  //         </Field>
  //         <Field orientation="horizontal">
  //           <FieldLabel htmlFor="sign-up">{FORM_TEXT[type].option}</FieldLabel>
  //           <Button type="button" variant="link">
  //             <Link href={FORM_TEXT[type].redirect}>
  //               {FORM_TEXT[type].redirectText}
  //             </Link>
  //           </Button>
  //         </Field>
  //       </FieldGroup>
  //     </CardFooter>
  //   </Card>
  // );
};

export default AuthForm;
