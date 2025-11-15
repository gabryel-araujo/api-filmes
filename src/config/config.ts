// Detecta se estamos rodando dentro do Docker ou localmente
const isDocker =
  process.env.NODE_ENV === "docker" || process.env.DOCKER_ENV === "true";

// URLs de conexão diferentes para Docker e ambiente local
const dockerDbUrl = "postgresql://postgres:postgres@db:5432/webflix";
const localDbUrl = "postgresql://postgres:postgres@localhost:5433/webflix";

export const config = {
  port: 8080,
  dbUrl: isDocker ? dockerDbUrl : localDbUrl,
  secretKey: "gabryelpfweb",
};
