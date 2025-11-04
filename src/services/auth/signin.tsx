import { signinSchema } from "@/schemas/auth";
import * as z from "zod";

const signInUser = (data: z.infer<typeof signinSchema>) => {};

export default signInUser;
