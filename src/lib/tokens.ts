import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEYS!);

export interface TokenPayload extends JWTPayload {
  id: string;
}

export async function generateToken(
  payload: TokenPayload
): Promise<string | null> {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(secretKey);
  } catch (error) {
    console.error('JWT Generation Error:', error);
    return null;
  }
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify<TokenPayload>(token, secretKey);
    return payload;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}
