import { z } from "zod";
import mongoose from "mongoose";

export const createTheatreSchema = z.object({
  name: z.string({ required_error: "Theatre name is required" }),
  logo: z.string().optional(),
});

export type CreateTheatreBody = z.infer<typeof createTheatreSchema>;

export const getTheatresSchema = z.object({
  search: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().default(1).transform(String),
  limit: z.coerce.number().default(10).transform(String),
  sort: z.string().optional().default("-createdAt"),
});
export type GetTheatresQuery = z.infer<typeof getTheatresSchema>;

export const updateTheatreSchema = z.object({
  name: z.string().optional(),
  logo: z.string().optional(),
});

export type UpdateTheatreBody = z.infer<typeof updateTheatreSchema>;

export const theatreIdParamsSchema = z.object({
  id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type TheatreIdParams = z.infer<typeof theatreIdParamsSchema>;
