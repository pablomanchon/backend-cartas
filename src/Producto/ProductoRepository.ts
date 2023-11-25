import { DataSource } from "typeorm";
import { Producto } from "./Producto";
require("dotenv").config();
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
  ssl: true,
});
export class ProductoRepository {
  static getAll = () => myDataSource.getRepository(Producto).find();

  static getOne = (id: string) =>
    myDataSource.getRepository(Producto).findOne({ where: { id } });

  static create = (productoData: Partial<Producto>) =>
    myDataSource.getRepository(Producto).save(productoData);

  static update = (id: string, productoData: Partial<Producto>) =>
    myDataSource.getRepository(Producto).save({ ...productoData, id });

  static delete = (id: string) =>
    myDataSource.getRepository(Producto).delete(id);
}
