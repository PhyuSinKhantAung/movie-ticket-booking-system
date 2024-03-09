import { z } from "zod";
import mongoose from "mongoose";

export const createShowtimeSchema = z.object({
  theatre: z.string({ required_error: "theatre is required" }).refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  venue: z.string({ required_error: "venue is required" }).refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  movie: z.string({ required_error: "movie is required" }).refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  start: z.string({ required_error: "start is required" }).refine((val) => {
    return new Date(val);
  }),
  end: z.string({ required_error: "end is required" }).refine((val) => {
    return new Date(val);
  }),
});

export type CreateShowtimeBody = z.infer<typeof createShowtimeSchema>;

export const getShowtimesSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().default(1).transform(String),
  limit: z.coerce.number().default(10).transform(String),
  sort: z.string().optional().default("-createdAt"),
  theatre: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  venue: z.string({ required_error: "theatre is required" }).refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  movie: z
    .string({ required_error: "theatre is required" })
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    })
    .optional(),
});
export type GetShowtimesQuery = z.infer<typeof getShowtimesSchema>;

export const updateShowtimeSchema = z.object({
  theatre: z
    .string()
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    })
    .optional(),
  venue: z
    .string()
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    })
    .optional(),
  movie: z
    .string()
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    })
    .optional(),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
});

export type UpdateShowtimeBody = z.infer<typeof updateShowtimeSchema>;

export const showtimeIdParamsSchema = z.object({
  id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type ShowtimeIdParams = z.infer<typeof showtimeIdParamsSchema>;
