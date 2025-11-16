import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { AuthError } from "../errors/AuthError";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const authService = new AuthService();
    const createdUser = await authService.createUser(name, email, password);

    return res
      .status(201)
      .json({ msg: "Usuário cadastrado com sucesso", data: createdUser });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }

    console.log(err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const authService = new AuthService();
    const token = await authService.authenticateUser(email, password);

    res.status(200).json({ token });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }

    console.log(err);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};
