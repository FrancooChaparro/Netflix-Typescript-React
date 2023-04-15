import { Sequelize } from "sequelize";
import pg from "pg";
import { modelUser } from "./src/models/User";
import { modelMovies } from "./src/models/Movies";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

export const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`,
  {
    logging: false,
    native: false,
    dialectModule: pg,
  }
);

modelUser(sequelize);
modelMovies(sequelize);

export const { user, movies } = sequelize.models;

console.log(sequelize.models);
