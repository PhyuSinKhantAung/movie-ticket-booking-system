import mongoose from "mongoose";
import { z } from "zod";

export const ROLES = ["operator", "supervisor"] as const;

export const createAdminBodySchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required." })
    .email("Please provide a valid email."),

  password: z
    .string({ required_error: "Password is required." })
    .min(6, "Password must have at least 6 characters."),
  role: z.enum(ROLES),
  theatre: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type CreateAdminBody = z.infer<typeof createAdminBodySchema>;

export const getAdminsSchema = z.object({
  search: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().default(1).transform(String),
  limit: z.coerce.number().default(10).transform(String),
  sort: z.string().optional().default("-createdAt"),
});
export type GetAdminsQuery = z.infer<typeof getAdminsSchema>;

export const updateAdminSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(ROLES).optional(),
  theatre: z
    .string()
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    })
    .optional(),
});

export type UpdateAdminBody = z.infer<typeof updateAdminSchema>;

export const adminIdParamsSchema = z.object({
  id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type adminIdParams = z.infer<typeof adminIdParamsSchema>;
