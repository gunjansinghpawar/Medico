// File: /app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/backend/config/db';
import { User } from '@/backend/models/User';
import { SessionToken } from '@/backend/models/SessionToken';
import { setAuthCookies } from '@/backend/utils/setAuthCookies';
import { generateTokens } from '@/backend/utils/generateTokens';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const { accessToken, refreshToken } = generateTokens({ userId: user._id.toString() });
    // ✅ Save tokens in DB
    await SessionToken.findOneAndUpdate(
      { userId: user._id },
      { accessToken, refreshToken },
      { upsert: true, new: true }
    );

    // ✅ Set cookies securely
    const response = NextResponse.json({
      message: 'Login successful',
      user: { id: user._id, email: user.email }
    });

    setAuthCookies(response, accessToken, refreshToken);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
