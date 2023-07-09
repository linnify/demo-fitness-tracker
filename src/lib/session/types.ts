export type SessionUser = {
  id: number;
  email: string;
};

export type SessionPayload = SessionUser & {
  exp: number;
};

export type Session = {
  user: SessionUser;
  exp: number;
};
