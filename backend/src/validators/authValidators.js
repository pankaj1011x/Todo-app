import { z } from "zod";

export const signupSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "must be 8 or more characters long" }),
});

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "must be 8 or more characters long" }),
});
