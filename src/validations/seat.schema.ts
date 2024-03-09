import { z } from "zod";
import mongoose from "mongoose";
const SeatAvailabilityStatus = ["empty", "reserved", "locked"] as const;

export const createSeatShema = z.object({
  showtime: z
    .string({ required_error: "showtime is required" })
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }),
  rows: z.coerce
    .number({ required_error: "rows is required" })
    .transform(String),
  columns: z.coerce
    .number({ required_error: "columns is required" })
    .transform(String),
});

export type CreateSeatBody = z.infer<typeof createSeatShema>;

export const getSeatsSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().default(1).transform(String),
  limit: z.coerce.number().default(10).transform(String),
  sort: z.string().optional().default("-createdAt"),
  showtime: z
    .string({ required_error: "showtime is required" })
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }),
});
export type GetSeatsQuery = z.infer<typeof getSeatsSchema>;

export const updateSeatStatusSchema = z.object({
  status: z.enum(SeatAvailabilityStatus),
});

export type UpdateSeatStatusBody = z.infer<typeof updateSeatStatusSchema>;

export const seatIdParamsSchema = z.object({
  id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type SeatIdParams = z.infer<typeof seatIdParamsSchema>;
