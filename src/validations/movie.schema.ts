import { z } from "zod";
import mongoose from "mongoose";

export const createMovieSchema = z.object({
  theatre: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  title: z.string({ required_error: "Movie title is required" }),
  image: z
    .object({
      url: z.string(),
      public_id: z.string(),
    })
    .optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
        public_id: z.string(),
      }),
    )
    .optional(),
  genres: z.array(z.string()),
  releasedDate: z.coerce.date().transform(String).optional(),
  hour: z.coerce.number().default(2),
  minute: z.coerce.number().default(0),
  language: z.string().default(""),
  year: z.string().default(""),
  director: z.string().default(""),
  plot: z.string().default(""),
  country: z.string().default(""),
});

export type CreateMovieBody = z.infer<typeof createMovieSchema>;

export const getMoviesSchema = z.object({
  theatre: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  search: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().default(1).transform(String),
  limit: z.coerce.number().default(10).transform(String),
  sort: z.string().optional().default("-createdAt"),
});
export type GetMoviesQuery = z.infer<typeof getMoviesSchema>;

export const updateMovieSchema = z.object({
  title: z.string().optional(),
  image: z
    .object({
      url: z.string(),
      public_id: z.string(),
    })
    .optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
        public_id: z.string(),
      }),
    )
    .optional(),
  genres: z.array(z.string()).optional(),
  releasedDate: z.coerce.date().transform(String).optional(),
  duration: z.number().optional(),
  isPublished: z.coerce.boolean().optional(),
  hour: z.coerce.number().optional(),
  minute: z.coerce.number().optional(),
  language: z.string().optional(),
  year: z.string().optional(),
  director: z.string().optional(),
  plot: z.string().optional(),
  country: z.string().optional(),
});

export type UpdateMovieBody = z.infer<typeof updateMovieSchema>;

export const movieIdParamsSchema = z.object({
  id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type MovieIdParams = z.infer<typeof movieIdParamsSchema>;
