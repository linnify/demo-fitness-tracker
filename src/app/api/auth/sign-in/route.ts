import { RequestDataContext, withValidation } from '@app/lib/validation';
import { EmailSignUpData, emailSignUpSchema } from '@app/lib/auth/validation';
import { NextRequest, NextResponse } from 'next/server';
import { singUp } from '@app/features/users/user.service';
import { encodeUser } from '@app/lib/auth/jwt';
import envConfig from '@app/config/env.config';
import { setResponseAuthCookie } from '@app/lib/auth/cookies';

const emailSignInHandler = async (
  req: NextRequest,
  context: RequestDataContext<EmailSignUpData>
) => {
  try {
    const userData = context.data;
    const user = await singUp(userData);

    const jwtToken = await encodeUser(user);

    const redirectUrl = userData.callbackUrl;
    const response = NextResponse.redirect(new URL(redirectUrl, envConfig.host, 'GET'));

    return setResponseAuthCookie(response, jwtToken);
  } catch (e) {
    const message = (e as Error).message ?? 'Error';
    return NextResponse.json({ message }, { status: 400 });
  }
};

export const POST = withValidation(emailSignUpSchema, emailSignInHandler);
