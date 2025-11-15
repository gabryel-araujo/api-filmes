import { AuthError } from "../errors/AuthError";
import { UserModel } from "../models/UserModel";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { authUserSchema, createUserSchema } from "../validators/authValidator";
import { AuthUserType, UserType } from "../types/userTypes";
import { config } from "../config/config";

export class AuthService {
  async createUser(reqName: string, reqEmail: string, reqPassword: string) {
    const validate = createUserSchema.safeParse({
      name: reqName,
      email: reqEmail,
      password: reqPassword,
    });

    if (!validate.success) {
      const message = validate.error.issues[0].message;
      throw new AuthError(message, 400);
    }

    const { name, email, password }: UserType = validate.data;

    const existingUser = await this.userExistsByEmail(email);
    if (existingUser) {
      throw new AuthError("Já existe uma conta associada a esse email", 409);
    }

    const encryptedPasswd = await bcrypt.hash(password, 12);

    const createdUser = await UserModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: encryptedPasswd,
    });

    return createdUser;
  }

  async userExistsByEmail(email: string) {
    return await UserModel.findOne({
      where: { email },
    });
  }

  async authenticateUser(reqEmail: string, reqPassword: string) {
    const validate = authUserSchema.safeParse({
      email: reqEmail,
      password: reqPassword,
    });

    if (!validate.success) {
      const message = validate.error.issues[0].message;
      throw new AuthError(message, 400);
    }

    const { email, password }: AuthUserType = validate.data;

    const existingUser = await this.userExistsByEmail(email);
    if (!existingUser) {
      throw new AuthError("Usuário ou senha incorretos", 400);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid)
      throw new AuthError("Usuário ou senha incorretos", 400);

    const token = jwt.sign({ id: existingUser.id }, config.secretKey, {
      expiresIn: "1h",
    });

    return token;
  }
}
