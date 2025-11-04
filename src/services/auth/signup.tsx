import { signupSchema } from "@/schemas/auth";
import * as z from "zod";

const signUpUser = (data: z.infer<typeof signupSchema>) => {};

export default signUpUser;
