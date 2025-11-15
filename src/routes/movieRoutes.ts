import { Router } from "express";
import { authenticate } from "../middlewares/tokenMiddleware";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMoviesByUser,
  updateMovie,
} from "../controllers/movieController";

const routerMovie = Router();

routerMovie.get("/", authenticate, getMoviesByUser);
routerMovie.get("/:id", authenticate, getMovieById);
routerMovie.post("/", authenticate, createMovie);
routerMovie.put("/:id", authenticate, updateMovie);
routerMovie.delete("/:id", authenticate, deleteMovie);

export default routerMovie;
