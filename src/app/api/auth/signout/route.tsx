// api/signout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/backend/config/db';
import { SessionToken } from '@/backend/models/SessionToken';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Get tokens from request cookies
    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!accessToken && !refreshToken) {
      // No tokens present - just clear cookies anyway
      const res = NextResponse.json({ message: 'Signed out successfully' });
      res.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
      res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });
      return res;
    }
    
    await SessionToken.deleteOne({
      $or: [{ accessToken }, { refreshToken }],
    });

    // Clear cookies
    const res = NextResponse.json({ message: 'Signed out successfully' });
    res.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

    return res;
  } catch (error) {
    console.error('Signout error:', error);
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 });
  }
}
