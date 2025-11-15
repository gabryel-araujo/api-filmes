import { DataTypes, HasManyGetAssociationsMixin, Model } from "sequelize";
import { sequelize } from "../config/database";
import { MovieModel } from "./MovieModel";

export class UserModel extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;

  declare getMovies: HasManyGetAssociationsMixin<MovieModel>;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);
