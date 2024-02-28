import dotenv from "dotenv";
import multer, { Multer } from "multer";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    ? String(process.env.CLOUDINARY_CLOUD_NAME)
    : "",
  api_key: process.env.CLOUDINARY_API_KEY
    ? String(process.env.CLOUDINARY_API_KEY)
    : "",
  api_secret: process.env.CLOUDINARY_API_SECRET
    ? String(process.env.CLOUDINARY_API_SECRET)
    : "",
});

interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage: storage });

type Image = {
  url: string;
  public_id: string;
};

export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files: CloudinaryFile[] = req.files as CloudinaryFile[];
    const file: CloudinaryFile = req.file as CloudinaryFile;

    if (!files && !file) {
      return next();
    }

    let cloudinaryUrl: Image = {
      url: "",
      public_id: "",
    };
    const resizedBuffer: Buffer = await sharp(file.buffer)
      .resize({ width: 800, height: 600 })
      .toBuffer();
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "movie-ticket-booking-system",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      (
        err: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return next(err);
        }
        if (!result) {
          console.error("Cloudinary upload error: Result is undefined");
          return next(new Error("Cloudinary upload result is undefined"));
        }
        cloudinaryUrl = { url: result.secure_url, public_id: result.public_id };

        //file processed now get your image here
        req.body.image = cloudinaryUrl;
        next();
      },
    );
    uploadStream.end(resizedBuffer);

    const cloudinaryUrls: Image[] = [];

    if (files) {
      for (const file of files) {
        const resizedBuffer: Buffer = await sharp(file.buffer)
          .resize({ width: 800, height: 600 })
          .toBuffer();

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "movie-ticket-booking-system",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
          (
            err: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined,
          ) => {
            if (err) {
              console.error("Cloudinary upload error:", err);
              return next(err);
            }
            if (!result) {
              console.error("Cloudinary upload error: Result is undefined");
              return next(new Error("Cloudinary upload result is undefined"));
            }
            cloudinaryUrls.push({
              url: result.secure_url,
              public_id: result.public_id,
            });

            if (cloudinaryUrls.length === files.length) {
              //All files processed now get your images here
              req.body.images = cloudinaryUrls;
              next();
            }
          },
        );
        uploadStream.end(resizedBuffer);
      }
    }
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    next(error);
  }
};
