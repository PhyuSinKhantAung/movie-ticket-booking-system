import { z } from "zod";

export const createAdminBodySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required." })
    .email("Please provide a valid email."),

  password: z
    .string({ required_error: "Password is required." })
    .min(6, "Password must have at least 6 characters."),
  role: z.string({ required_error: "Role is required" }),
});

export type CreateAdminBody = z.infer<typeof createAdminBodySchema>;
