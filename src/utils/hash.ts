import { hash as bcryptHash } from 'bcryptjs';

export const hash = async (password: string) => {
  return await bcryptHash(password, 10);
};
