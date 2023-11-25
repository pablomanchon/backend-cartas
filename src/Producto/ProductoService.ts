import { Producto } from "./Producto";
import { ProductoRepository } from "./ProductoRepository";

export class ProductoService {
  static getAll = () => ProductoRepository.getAll();

  static getOne = (id: string) => ProductoRepository.getOne(id);

  static create = (productoData: Partial<Producto>) =>
    ProductoRepository.create(productoData);

  static update = (id: string, productoData: Partial<Producto>) =>
    ProductoRepository.update(id, productoData);

  static delete = (id: string) => ProductoRepository.delete(id);
}
