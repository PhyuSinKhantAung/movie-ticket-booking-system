import { z } from "zod";

("mongoose");
export const createTheatreSchema = z.object({
  name: z.string({ required_error: "Theatre name is required" }),
  logo: z.string().optional(),
});

export type CreateTheatreBody = z.infer<typeof createTheatreSchema>;

export const getTheatresSchema = z.object({
  search: z.string().optional(),
  name: z.string().optional(),
  //   page: z.coerce.number().default(1).transform(String),
  //   limit: z.coerce.number().default(10).transform(String),
  page: z.string().default("1"),
  limit: z.string().default("10"),

  sort: z.string().optional().default("-createdAt"),
});

export type GetTheatresQuery = z.infer<typeof getTheatresSchema>;

export const theatreIdParamsSchema = z.object({
  //   id: z.instanceof(ObjectId),
  id: z.string(),
});

export type TheatreIdParams = z.infer<typeof theatreIdParamsSchema>;
