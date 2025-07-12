import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/backend/config/db';
import { User } from '@/backend/models/User';
import { SessionToken } from '@/backend/models/SessionToken';
import { JWT_SECRET, REFRESH_SECRET } from '../../../../../ConstandURLS';
import { setAuthCookies } from '@/backend/utils/setAuthCookies';
import { generateTokens } from '@/backend/utils/generateTokens';
import { uploadToCloudinary } from '@/backend/utils/cloudinaryUpload';

export async function PUT(req: NextRequest) {
  await connectDB();

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  let decoded: jwt.JwtPayload | undefined;

  try {
    if (!accessToken) throw new Error('Access token missing');
    const verified = jwt.verify(accessToken, JWT_SECRET);
    if (typeof verified === 'string') throw new Error('Invalid token');
    decoded = verified as jwt.JwtPayload;
  } catch {
    if (!refreshToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const refreshDecoded = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;

      if (!refreshDecoded?.userId) {
        return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens({
        userId: refreshDecoded.userId.toString(),
      });

      await SessionToken.findOneAndUpdate(
        { userId: refreshDecoded.userId },
        { accessToken: newAccessToken, refreshToken: newRefreshToken },
        { upsert: true, new: true }
      );

      decoded = refreshDecoded;

      const formData = await req.formData();
      const updateData: any = {};

      // Profile image check
      const file = formData.get('profileImage') as File;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult: any = await uploadToCloudinary(buffer, `user_${decoded.userId}`);
        updateData.profileImage = uploadResult.secure_url;
      }

      // Other fields
      formData.forEach((value, key) => {
        if (key !== 'profileImage') updateData[key] = value;
      });

      const updatedUser = await User.findByIdAndUpdate(
        decoded.userId,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const res = NextResponse.json({
        message: 'User updated and tokens refreshed',
        user: updatedUser
      });

      setAuthCookies(res, newAccessToken, newRefreshToken);
      return res;

    } catch (refreshErr) {
      console.error('Refresh token error:', refreshErr);
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }
  }

  // ✅ Final Step: Access Token valid
  try {
    if (!decoded?.userId) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    const formData = await req.formData();
    const updateData: any = {};

    const file = formData.get('profileImage') as File;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult: any = await uploadToCloudinary(buffer, `user_${decoded.userId}`);
      updateData.profileImage = uploadResult.secure_url;
    }

    formData.forEach((value, key) => {
      if (key !== 'profileImage') updateData[key] = value;
    });

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (updateError) {
    console.error('Update error:', updateError);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
