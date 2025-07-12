// utils/cloudinaryUpload.ts

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (fileBuffer: Buffer, filename: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: 'user-profiles', public_id: filename },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(fileBuffer);
    });
};

export const deleteFromCloudinary = async (publicId: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

export const getCloudinaryUrl = (publicId: string) => {
    return cloudinary.url(publicId, {
        secure: true,
        transformation: [
            { width: 300, height: 300, crop: 'fill' },
            { quality: 'auto', fetch_format: 'auto' }
        ]
    });
};
export const getCloudinaryThumbnailUrl = (publicId: string) => {
    return cloudinary.url(publicId, {
        secure: true,
        transformation: [
            { width: 100, height: 100, crop: 'fill' },
            { quality: 'auto', fetch_format: 'auto' }
        ]
    });
};

export const getCloudinaryImageUrl = (publicId: string) => {
    return cloudinary.url(publicId, {
        secure: true,
        transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' }
        ]
    });
};

