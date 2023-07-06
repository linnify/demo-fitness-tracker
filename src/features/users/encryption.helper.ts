import bcrypt from 'bcrypt';

export const getHashedPassword = (password: string): string => {
  const salt: string = bcrypt.genSaltSync();

  return bcrypt.hashSync(password, salt);
};
