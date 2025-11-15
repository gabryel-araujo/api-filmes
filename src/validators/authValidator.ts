import z from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "O nome não pode ser vazio!"),
  email: z.email("Formato de email inválido verifique a ortografia"),
  password: z
    .string()
    .trim()
    .min(6, "A senha deve possuir no mínimo 6 caracteres"),
});

export const authUserSchema = z.object({
  email: z.email("Formato de email inválido. Verifique a ortografia"),
  password: z
    .string()
    .trim()
    .min(6, "A senha deve possuir no mínimo 6 caracteres"),
});
