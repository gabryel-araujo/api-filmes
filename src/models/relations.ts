import { MovieModel } from "./MovieModel";
import { UserModel } from "./UserModel";

UserModel.hasMany(MovieModel, {
  foreignKey: "userId",
  as: "movies",
});

MovieModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});
