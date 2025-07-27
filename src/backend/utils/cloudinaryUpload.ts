// utils/cloudinaryUpload.ts

import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Define the shape of the Cloudinary upload result (use official typings from 'cloudinary')
export type CloudinaryUploadResult = UploadApiResponse;

// Setup your cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Uploads an image buffer to Cloudinary, returns a typed promise
export const uploadToCloudinary = (
  fileBuffer: Buffer,
  filename: string
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: 'user-profiles', public_id: filename },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      )
      .end(fileBuffer);
  });
};

// Helper type for the delete response
type CloudinaryDeleteResult = { result: string };

// Delete an image from Cloudinary
export const deleteFromCloudinary = (
  publicId: string
): Promise<CloudinaryDeleteResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .destroy(publicId, (error: UploadApiErrorResponse | undefined, result: CloudinaryDeleteResult | undefined) => {
        if (error || !result) return reject(error);
        resolve(result);
      });
  });
};

// Get transformed image URLs functions below
export const getCloudinaryUrl = (publicId: string) =>
  cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width: 300, height: 300, crop: 'fill' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });

export const getCloudinaryThumbnailUrl = (publicId: string) =>
  cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width: 100, height: 100, crop: 'fill' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });

export const getCloudinaryImageUrl = (publicId: string) =>
  cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width: 800, height: 600, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });
