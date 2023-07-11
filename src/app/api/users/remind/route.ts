import { RequestDataContext } from '@app/lib/validation';
import { LoginData } from '@app/lib/auth/validation';
import { NextRequest, NextResponse } from 'next/server';

const loginHandler = async (req: NextRequest, context: RequestDataContext<LoginData>) => {
  console.log('Reminder sent!');
  return NextResponse.json({}, { status: 200 });
};

export const POST = loginHandler;
