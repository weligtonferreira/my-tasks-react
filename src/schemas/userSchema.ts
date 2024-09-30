import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string({ required_error: 'O nome é obrigatório' }),
  email: z.string({ required_error: 'O email é obrigatório' }).email(),
  password: z.string({ required_error: 'A senha é obrigatória' }),
});
