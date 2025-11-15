import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";
import { config } from "./config/config";

const app = express();
app.use(cors());

app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta: ${config.port}`);
});

export default app;
