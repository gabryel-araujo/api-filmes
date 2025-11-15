import { MovieModel } from "../models/MovieModel";
import { MOVIE_SCHEMA } from "../validators/movieValidator";

export class MovieService {
  async getMoviesByUser(userId: string | undefined) {
    if (!userId) {
      throw new Error("Acesso negado");
    }

    return await MovieModel.findAll({
      where: { userId },
    });
  }

  async getMoviesById(userId: string | undefined, movieId: string) {
    if (!userId) {
      throw new Error("Acesso negado");
    }

    const movie = await MovieModel.findOne({
      where: { userId, id: movieId },
    });

    if (!movie) {
      throw new Error("Nenhum filme encontrado com esse id.");
    }

    return movie;
  }

  async createMovie(
    reqUrl: string,
    reqTitle: string,
    reqGenre: string,
    reqAge: string,
    reqDuration: string,
    reqPoints: string,
    reqDescription: string,
    reqRelease: string,
    userId: string | undefined
  ) {
    if (!userId) {
      throw new Error("Acesso negado");
    }

    const validate = MOVIE_SCHEMA.safeParse({
      url: reqUrl,
      title: reqTitle,
      genre: reqGenre,
      age: reqAge,
      duration: reqDuration,
      points: reqPoints,
      description: reqDescription,
      release: reqRelease,
    });
    if (!validate.success) {
      const message = validate.error.issues[0].message;
      throw new Error(message);
    }
    const { url, title, genre, age, duration, points, description, release } =
      validate.data;

    const createdMovie = await MovieModel.create({
      url: url.trim(),
      title: title.trim(),
      genre: genre.trim(),
      age: age.trim(),
      duration: duration.trim(),
      points: points ? points.trim() : undefined,
      description: description.trim(),
      release: release.trim(),
      userId,
    });

    return createdMovie;
  }

  async updateMovie(
    updateObject: any,
    userId: string | undefined,
    movieId: string
  ) {
    if (!userId) {
      throw new Error("Acesso negado");
    }

    const movie = await MovieModel.findOne({
      where: {
        id: movieId,
        userId: userId,
      },
    });

    if (!movie) {
      throw new Error("Filme não encontrado");
    }

    return await movie.update(updateObject);
  }

  async deleteMovie(userId: string | undefined, movieId: string) {
    if (!userId) {
      throw new Error("Acesso negado");
    }

    const movie = await MovieModel.findOne({
      where: {
        id: movieId,
        userId: userId,
      },
    });

    if (!movie) {
      throw new Error("Filme não encontrado");
    }

    await movie.destroy();

    return { message: "Filme deletado com sucesso" };
  }
}
