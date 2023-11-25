import { DataSource } from "typeorm";
import { Producto } from "../Producto/Producto";
console.log(process.env.DB_USERNAME);
export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: true,
  logging: true,
  entities: [Producto],
});
