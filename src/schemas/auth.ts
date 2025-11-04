import * as z from "zod";

export const signupSchema = z
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

export const signinSchema = z.object({
  email: z.string().nonempty("Email is required").email("Email must be valid"),
  password: z.string().nonempty("Password is required"),
});

export const authSchemas = {
  signin: signinSchema,
  signup: signupSchema,
};

export type AuthMap = {
  signin: z.infer<typeof signinSchema>;
  signup: z.infer<typeof signupSchema>;
};
