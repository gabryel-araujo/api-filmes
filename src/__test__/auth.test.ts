import request from "supertest";
import app from "../index";
import { UserModel } from "../models/UserModel";

describe("Rotas de Autenticação", () => {
  const testUser = {
    name: "Tester",
    email: `tester-${Date.now()}@email.com`,
    password: "tester123",
  };

  afterAll(async () => {
    await UserModel.destroy({ where: { email: testUser.email } });
  });

  it("POST /auth/register - deve cadastrar um novo usuário", async () => {
    const res = await request(app).post("/auth/register").send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.msg).toBe("Usuário cadastrado com sucesso");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.email).toBe(testUser.email.toLowerCase());
  });

  it("POST /auth/register - deve falhar se o email já estiver cadastrado", async () => {
    const res = await request(app).post("/auth/register").send(testUser);

    expect(res.status).toBe(409);
    expect(res.body.msg).toBe("Já existe uma conta associada a esse email");
  });

  it("POST /auth/login - deve fazer o login do utilizador e retornar um token", async () => {
    const res = await request(app).post("/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /auth/login - deve falhar com a password errada", async () => {
    const res = await request(app).post("/auth/login").send({
      email: testUser.email,
      password: "senhasenhasenha",
    });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("Usuário ou senha incorretos");
  });
});
