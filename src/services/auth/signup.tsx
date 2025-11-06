import { signupSchema } from "@/schemas/auth";
import * as z from "zod";

const signUpUser = async (data: z.infer<typeof signupSchema>) => {
  console.log(data);

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export default signUpUser;
