import { z } from "zod";

("mongoose");
export const createTheatreSchema = z.object({
  name: z.string({ required_error: "Theatre name is required" }),
  logo: z.string().optional(),
});

export type CreateTheatreBody = z.infer<typeof createTheatreSchema>;

export const getTheatresSchema = z.object({
  search: z.string().optional(),
});

export type GetTheatresQuery = z.infer<typeof getTheatresSchema>;

export const theatreIdParamsSchema = z.object({
  //   id: z.instanceof(ObjectId),
  id: z.string(),
});

export type TheatreIdParams = z.infer<typeof theatreIdParamsSchema>;
