import { Request, Response } from "express";
import { MovieService } from "../services/MovieService";

export const getMoviesByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const movieService = new MovieService();
    const movies = await movieService.getMoviesByUser(userId);
    return res.status(200).json(movies);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ msg: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const movieId = req.params.id;
    const movieService = new MovieService();
    const movie = await movieService.getMoviesById(userId, movieId);
    return res.status(200).json(movie);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ msg: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const { url, title, genre, age, duration, points, description, release } =
      req.body;

    const movieService = new MovieService();
    const movie = await movieService.createMovie(
      url,
      title,
      genre,
      age,
      duration,
      points,
      description,
      release,
      userId
    );

    return res
      .status(201)
      .json({ msg: "Filme criado com sucesso!", data: movie });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ msg: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const movieId = req.params.id;

    const updateObject = req.body;

    const movieService = new MovieService();
    const movie = await movieService.updateMovie(
      updateObject,
      userId,
      movieId
    );

    return res
      .status(201)
      .json({ msg: "Filme atualizado com sucesso!", data: movie });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ msg: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const movieId = req.params.id;

    const movieService = new MovieService();
    await movieService.deleteMovie(userId, movieId);

    return res.status(200).json({ msg: "Filme apagado com sucesso!" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ msg: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};
