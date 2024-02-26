import { z } from "zod";

export const signUpUserSchema = z.object({
  name: z.string({ required_error: "User name is required" }),
  email: z
    .string({ required_error: "Email is required." })
    .email("Please provide a valid email."),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, "Password must have at least 6 characters."),
  location: z.string().optional(),
});

export type SignUpUserBody = z.infer<typeof signUpUserSchema>;

export const signInUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Please provide a valid email."),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, "Password must have at least 6 characters."),
});

export type SignInUserBody = z.infer<typeof signInUserSchema>;
