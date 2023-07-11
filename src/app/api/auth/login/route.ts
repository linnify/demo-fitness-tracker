import { RequestDataContext, withValidation } from '@app/lib/validation';
import { LoginData, loginSchema } from '@app/lib/auth/validation';
import { NextRequest, NextResponse } from 'next/server';
import { login, singUp } from '@app/features/users/user.service';
import { encodeUser } from '@app/lib/auth/jwt';
import { setResponseAuthCookie } from '@app/lib/auth/cookies';

const loginHandler = async (req: NextRequest, context: RequestDataContext<LoginData>) => {
  try {
    const userData = context.data;
    const user = await login(userData);

    const jwtToken = await encodeUser(user);

    const response = NextResponse.json({}, { status: 201 });

    return setResponseAuthCookie(response, jwtToken);
  } catch (e) {
    const message = (e as Error).message ?? 'Error';
    return NextResponse.json({ message }, { status: 400 });
  }
};

export const POST = withValidation(loginSchema, loginHandler);
