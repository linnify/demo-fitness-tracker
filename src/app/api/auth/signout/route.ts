import { NextRequest, NextResponse } from 'next/server';
import { setResponseAuthCookie } from '@app/lib/auth/cookies';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const response = NextResponse.json({
    message: 'Logout success'
  });

  return setResponseAuthCookie(response, '');
};
