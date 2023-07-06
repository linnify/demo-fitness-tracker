export type EmailSignInOptions = {
  callbackUrl?: string;
};

export type EmailSignInResponse = {
  ok: boolean;
  error?: string;
};

export type SignOutOptions = {
  callbackUrl?: string;
};
