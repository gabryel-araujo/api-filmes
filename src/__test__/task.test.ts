import request from "supertest";
import app from "../index";

describe("Rotas de Tarefas (Protegidas)", () => {
  let token: string;
  let userId: number;
  let taskId: number;

  beforeAll(async () => {
    const testUser = {
      name: "Tester",
      email: `tester@email.com`,
      password: "tester123",
    };
    const registerRes = await request(app)
      .post("/auth/register")
      .send(testUser);
    userId = registerRes.body.data.id;

    const loginRes = await request(app).post("/auth/login").send(testUser);
    token = loginRes.body.token;
  });

  it("POST /tasks - não deve criar uma tarefa sem um token", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Tarefa de Teste",
      description: "Teste sem autenticação",
    });

    expect(res.status).toBe(401);
  });

  it("POST /tasks - deve criar uma nova tarefa com um token válido", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Minha Primeira Tarefa",
        description: "Descrição para a primeira tarefa",
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.title).toBe("Minha Primeira Tarefa");
    expect(res.body.data.userId).toBe(userId);
    taskId = res.body.data.id;
  });

  it("GET /tasks - deve obter todas as tarefas para o utilizador autenticado", async () => {
    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].userId).toBe(userId);
  });

  it("GET /tasks/:id - deve obter uma tarefa específica por ID", async () => {
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  it("PUT /tasks/:id - deve atualizar uma tarefa", async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Título da Tarefa Atualizado",
        done: true,
        description: "Descrição da tarefa",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Título da Tarefa Atualizado");
    expect(res.body.data.done).toBe(true);
  });

  it("DELETE /tasks/:id - deve apagar uma tarefa", async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("GET /tasks/:id - deve retornar 404 para uma tarefa apagada", async () => {
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});
