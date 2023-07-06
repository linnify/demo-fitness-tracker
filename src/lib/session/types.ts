export type SessionUser = {
  id: number;
  email: string;
  onboarded: boolean;
};

export type SessionPayload = SessionUser & {
  exp: number;
};

export type Session = {
  user: SessionUser;
  exp: number;
};
