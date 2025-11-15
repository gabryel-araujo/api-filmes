import { DataTypes, ForeignKey, Model } from "sequelize";
import { sequelize } from "../config/database";
import { UserModel } from "./UserModel";

export class MovieModel extends Model {
  declare id: string;
  declare userId: ForeignKey<UserModel["id"]>;
  declare url: string;
  declare title: string;
  declare genre: string;
  declare age: string;
  declare duration: string;
  declare points: string;
  declare description: string;
  declare release: string;
}

MovieModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: "movies", timestamps: true }
);
