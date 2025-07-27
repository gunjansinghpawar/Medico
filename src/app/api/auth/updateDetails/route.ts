import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { connectDB } from '@/backend/config/db';
import { User } from '@/backend/models/User';
import { SessionToken } from '@/backend/models/SessionToken';
import { JWT_SECRET, REFRESH_SECRET } from '../../../../../ConstandURLS';
import { setAuthCookies } from '@/backend/utils/setAuthCookies';
import { generateTokens } from '@/backend/utils/generateTokens';
import { uploadToCloudinary } from '@/backend/utils/cloudinaryUpload';

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: unknown;
}

type UpdateData = Record<string, string | Blob | boolean>;

export async function PUT(req: NextRequest) {
  await connectDB();

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  let decoded: MyJwtPayload | undefined;

  // Utility to extract update data (and handle profile image) based on Content-Type
  async function parseBody(request: NextRequest, userId: string): Promise<{ updateData: UpdateData; error?: string }> {
    const contentType = request.headers.get('content-type');
    const updateData: UpdateData = {};

    if (
      contentType &&
      (contentType.startsWith('multipart/form-data') ||
        contentType.startsWith('application/x-www-form-urlencoded'))
    ) {
      const formData = await request.formData();
      const file = formData.get('profileImage');

      if (file instanceof File && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult: CloudinaryUploadResult = await uploadToCloudinary(buffer, `user_${userId}`);

        // IMPORTANT: Adjust the below key to match your actual User schema field for profile image
        updateData.avatar = uploadResult.secure_url; // store URL into 'avatar' field
      }

      // Add other form fields excluding 'profileImage'
      formData.forEach((value, key) => {
        if (key !== 'profileImage') updateData[key] = value as string;
      });

    } else if (contentType && contentType.startsWith('application/json')) {
      const json = await request.json();
      Object.assign(updateData, json);

      // Optionally you can handle profileImage if sent as base64/URL, but usually image uploads use formData
    } else {
      return { updateData: {}, error: 'Unsupported Content-Type' };
    }

    return { updateData };
  }

  // Verify access token or fallback to refresh token to authenticate
  try {
    if (!accessToken) throw new Error('Access token missing');
    const verified = jwt.verify(accessToken, JWT_SECRET);
    if (typeof verified === 'string') throw new Error('Invalid token');
    decoded = verified as MyJwtPayload;
  } catch {
    // Access token invalid or expired, try refresh token flow
    if (!refreshToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const refreshDecoded = jwt.verify(refreshToken, REFRESH_SECRET) as MyJwtPayload;

      if (!refreshDecoded?.userId) {
        return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
      }

      // Generate new tokens
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens({
        userId: refreshDecoded.userId.toString(),
      });

      // Update session tokens in DB
      await SessionToken.findOneAndUpdate(
        { userId: refreshDecoded.userId },
        { accessToken: newAccessToken, refreshToken: newRefreshToken },
        { upsert: true, new: true }
      );

      decoded = refreshDecoded;

      // Parse update data (form or JSON)
      const { updateData, error } = await parseBody(req, String(decoded.userId));
      if (error) {
        return NextResponse.json({ error }, { status: 415 });
      }

      const updatedUser = await User.findByIdAndUpdate(decoded.userId, { $set: updateData }, { new: true, runValidators: true })
        .select('-password');

      if (!updatedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const res = NextResponse.json({
        message: 'User updated and tokens refreshed',
        user: updatedUser,
      });

      setAuthCookies(res, newAccessToken, newRefreshToken);
      return res;

    } catch (refreshErr) {
      console.error('Refresh token error:', refreshErr);
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }
  }

  // If access token is valid, proceed with update
  try {
    if (!decoded?.userId) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    const { updateData, error } = await parseBody(req, String(decoded.userId));
    if (error) {
      return NextResponse.json({ error }, { status: 415 });
    }

    const updatedUser = await User.findByIdAndUpdate(decoded.userId, { $set: updateData }, { new: true, runValidators: true })
      .select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser,
    });

  } catch (updateError) {
    console.error('Update error:', updateError);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
