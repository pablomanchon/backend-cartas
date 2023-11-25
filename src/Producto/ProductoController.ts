import { Request, Response } from "express";
import { ProductoService } from "./ProductoService";
import sharp from "sharp";
import fs from "fs";
import { Producto } from "./Producto";

export class ProductoController {
  static getAll = async (req: Request, res: Response) => {
    const productos = await ProductoService.getAll();
    return res.send(productos);
  };

  static getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const producto = await ProductoService.getOne(id);
    return res.send(producto);
  };

  static create = async (req: Request, res: Response) => {
    const { nombre, precio, categoria } = req.body;
    const imagenes = req.files;

    let processedImages;
    if (Array.isArray(imagenes)) {
      processedImages = await Promise.all(
        imagenes.map(async (image) => {
          const processedImage = await sharp(image.path)
            .webp({ quality: 50 })
            .toBuffer();
          fs.unlink(image.path, (err) => {
            if (err) {
              console.error(
                `Error al eliminar el archivo ${image.path}:`,
                err.message
              );
            }
          });
          return processedImage;
        })
      );
    }
    const producto = new Producto();
    producto.nombre = nombre;
    producto.precio = precio;
    producto.categoria = categoria;
    producto.imagenes = processedImages ? processedImages : [];

    const createdProducto = await ProductoService.create(producto);
    return res.send(producto);
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const producto = await ProductoService.update(id, req.body);
    return res.send(producto);
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await ProductoService.delete(id);
    return res.status(204).send();
  };
}
