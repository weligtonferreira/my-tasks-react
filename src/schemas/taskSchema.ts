import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string({ required_error: 'O título é obrigatório' }),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Título inválido').optional(),
  description: z.string().optional(),
});
