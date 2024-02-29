import { z } from "zod";
import mongoose from "mongoose";

export const createVenueSchema = z.object({
  theatre: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  region: z.string({ required_error: "region is required" }),
  location: z.string({ required_error: "location is required" }),
});

export type CreateVenueBody = z.infer<typeof createVenueSchema>;

export const getVenuesSchema = z.object({
  search: z.string().optional(),
  name: z.string().optional(),
  page: z.coerce.number().default(1).transform(String),
  limit: z.coerce.number().default(10).transform(String),
  sort: z.string().optional().default("-createdAt"),
});
export type GetVenuesQuery = z.infer<typeof getVenuesSchema>;

export const updateVenueSchema = z.object({
  theatre: z
    .string()
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    })
    .optional(),
  region: z.string({ required_error: "region is required" }).optional(),
  location: z.string({ required_error: "location is required" }).optional(),
});

export type UpdateVenueBody = z.infer<typeof updateVenueSchema>;

export const venueIdParamsSchema = z.object({
  id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type VenueIdParams = z.infer<typeof venueIdParamsSchema>;
