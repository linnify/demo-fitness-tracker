import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  console.log('Reminder sent!');
  return NextResponse.json({}, { status: 200 });
};
