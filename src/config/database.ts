import { Sequelize } from "sequelize";
import { config } from "./config";

export const sequelize = new Sequelize(config.dbUrl, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Banco sincronizado!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar banco:", err);
  });
