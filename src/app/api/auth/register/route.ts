import { RequestDataContext, withValidation } from '@app/lib/validation';
import { RegisterData, registerSchema } from '@app/lib/auth/validation';
import { NextRequest, NextResponse } from 'next/server';
import { singUp } from '@app/features/users/user.service';
import { encodeUser } from '@app/lib/auth/jwt';
import envConfig from '@app/config/env.config';
import { setResponseAuthCookie } from '@app/lib/auth/cookies';

const emailSignInHandler = async (req: NextRequest, context: RequestDataContext<RegisterData>) => {
  try {
    const userData = context.data;
    const user = await singUp(userData);

    const jwtToken = await encodeUser(user);

    const response = NextResponse.json({}, { status: 201 });

    return setResponseAuthCookie(response, jwtToken);
  } catch (e) {
    const message = (e as Error).message ?? 'Error';
    return NextResponse.json({ message }, { status: 400 });
  }
};

export const POST = withValidation(registerSchema, emailSignInHandler);
