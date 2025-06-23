import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/backend/config/db';
import { User } from '@/backend/models/User';
import { SessionToken } from '@/backend/models/SessionToken';
import { JWT_SECRET, REFRESH_SECRET } from '../../../../../ConstandURLS';
import { setAuthCookies } from '@/backend/utils/setAuthCookies';
import { generateTokens } from '@/backend/utils/generateTokens';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;
    let decoded: jwt.JwtPayload | undefined;

    // 🧪 Try verifying access token
    try {
      if (!accessToken) throw new Error('Missing access token');
      const verified = jwt.verify(accessToken, JWT_SECRET);
      if (typeof verified === 'string') throw new Error('Invalid token');
      decoded = verified as jwt.JwtPayload;
    } catch {
      // 🔁 If access token fails, try refresh
      if (!refreshToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      try {
        const refreshDecoded = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;
        if (!refreshDecoded?.userId) {
          return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
        }

        // 🔁 Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens({
          userId: refreshDecoded.userId.toString(),
        });

        // 💾 Save in DB
        await SessionToken.findOneAndUpdate(
          { userId: refreshDecoded.userId },
          { accessToken: newAccessToken, refreshToken: newRefreshToken },
          { upsert: true, new: true }
        );

        // 🍪 Set cookies and fetch user
        const user = await User.findById(refreshDecoded.userId).select('-password');
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const res = NextResponse.json({ user });
        setAuthCookies(res, newAccessToken, newRefreshToken);

        return res;
      } catch (err) {
        console.error('Refresh token error:', err);
        return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
      }
    }

    // ✅ Final: Valid access token
    if (!decoded?.userId) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error('Fetch user error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
