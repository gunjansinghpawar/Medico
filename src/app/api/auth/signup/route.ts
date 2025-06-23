// File: /app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/backend/config/db';
import { User } from '@/backend/models/User';
import { SessionToken } from '@/backend/models/SessionToken';
import { setAuthCookies } from '@/backend/utils/setAuthCookies';
import { generateTokens } from '@/backend/utils/generateTokens';

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, password } = await req.json();
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    const { accessToken, refreshToken } = generateTokens({ userId: newUser._id.toString() });
    await SessionToken.findOneAndUpdate(
      { userId: newUser._id },
      { accessToken, refreshToken },
      { upsert: true, new: true }
    );
    // Prepare and send response
    const response = NextResponse.json({
      message: 'User created',
      userId: newUser._id,
    });
    setAuthCookies(response, accessToken, refreshToken);

    // Set cookies
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
