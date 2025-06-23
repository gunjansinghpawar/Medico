import jwt from 'jsonwebtoken';
import { JWT_SECRET, REFRESH_SECRET } from '../../../ConstandURLS';

interface TokenPayload {
  userId: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export function generateTokens(payload: TokenPayload): Tokens {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
}
