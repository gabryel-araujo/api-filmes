import z from "zod";

export const MOVIE_SCHEMA = z.object({
  url: z.string().trim().min(1, "Adicione uma imagem para a capa do filme"),
  title: z.string().trim().min(1, "O titulo do filme não pode ser vazio."),
  genre: z.string().trim().min(1, "O gênero do filme não pode ser vazio."),
  age: z.string().trim().min(1, "Defina uma faixa etária"),
  duration: z.string().trim().min(1, "A duração do filme não pode ser vazia."),
  points: z.string().trim().optional(),
  description: z.string().trim().min(1, "Adicione uma descrição ao filme"),
  release: z.string().trim().min(1, "Adicione a data de lançamento do filme"),
});
