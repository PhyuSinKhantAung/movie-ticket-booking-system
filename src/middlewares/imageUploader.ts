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

interface FileRequest extends Request {
  files: {
    images: CloudinaryFile[];
    image: CloudinaryFile[];
  };
}
export const uploadToCloudinary = async (
  req: FileRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.files?.image && !req.files?.images) {
      return next();
    }
    const files: CloudinaryFile[] =
      req.files?.images && (req.files?.images as CloudinaryFile[]);
    const file: CloudinaryFile =
      req.files?.image && (req.files?.image[0] as CloudinaryFile);

    const cloudinaryUrls: Image[] = [];
    let cloudinaryUrl: Image = {
      url: "",
      public_id: "",
    };

    if (file) {
      const uploadResult: Image = await new Promise((resolve) => {
        cloudinary.uploader
          .upload_stream(
            (error: UploadApiErrorResponse, result: UploadApiResponse) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                return next(error);
              }
              cloudinaryUrl = {
                url: result.secure_url,
                public_id: result.public_id,
              };

              resolve(cloudinaryUrl);
            },
          )
          .end(file.buffer);
      });

      req.body.image = uploadResult;
    }

    if (files) {
      await Promise.all(
        files?.map(async (file: CloudinaryFile) => {
          const resizedBuffer: Buffer = await sharp(file.buffer)
            .resize({ width: 800, height: 600 })
            .toBuffer();

          const uploadResults: Image[] = await new Promise((resolve) => {
            cloudinary.uploader
              .upload_stream(
                (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                  if (error) {
                    console.error("Cloudinary upload error:", error);
                    return next(error);
                  }

                  cloudinaryUrls.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                  });

                  resolve(cloudinaryUrls);
                },
              )
              .end(resizedBuffer);
          });

          req.body.images = uploadResults;
        }),
      );
    }
    next();
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    next(error);
  }
};
