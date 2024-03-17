import { z } from "zod";
import mongoose from "mongoose";
import { BOOKING_STATUS } from "src/models/booking.model";

export const createBookingSchema = z.object({
  user: z.string({ required_error: "user is required" }).refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  showtime: z
    .string({ required_error: "showtime is required" })
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }),
  venue: z.string({ required_error: "venue is required" }).refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
  seats: z.array(
    z.string({ required_error: "seat is required" }).refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }),
  ),
});

export type CreateBookingBody = z.infer<typeof createBookingSchema>;

export const getBookingsSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().default(1).transform(String),
  limit: z.coerce.number().default(10).transform(String),
  sort: z.string().optional().default("-createdAt"),
  venue: z.string({ required_error: "venue is required" }).refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type GetBookingsQuery = z.infer<typeof getBookingsSchema>;

export const updateBookingStatusSchema = z.object({
  status: z.enum(BOOKING_STATUS),
});

export type UpdateBookingStatusBody = z.infer<typeof updateBookingStatusSchema>;

export const bookingIdParamsSchema = z.object({
  id: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val);
  }),
});

export type BookingIdParams = z.infer<typeof bookingIdParamsSchema>;
