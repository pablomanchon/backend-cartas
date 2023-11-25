import express, { Request, Response } from "express";
import { ProductoController } from "./Producto/ProductoController";
import { myDataSource } from "./Producto/ProductoRepository";
import multer from "multer";
require("dotenv").config();
const upload = multer({ dest: "uploads/" });

myDataSource
  .initialize()
  .then(() => {
    const app = express();
    const port = Number(process.env.PORT) || 3000;
    const router = express.Router();
    const cors = require("cors");
    app.use(
      cors({
        origin: "http://localhost:3001",
      })
    );
    router.get("/productos", ProductoController.getAll);
    router.get("/productos/:id", ProductoController.getOne);
    router.post(
      "/productos",
      upload.array("imagenes"),
      ProductoController.create
    );
    router.put("/productos/:id", ProductoController.update);
    router.delete("/productos/:id", ProductoController.delete);
    app.get("/", (req: Request, res: Response) => {
      res.send("¡Hola Mundo!");
    });

    app.use("/api", router);
    app.listen(port, "0.0.0.0", () => {
      console.log(`El servidor se está ejecutando en http://localhost:${port}`);
    });
  })
  .catch((err) =>
    console.error("Error al conectar con la base de datos: ", err.message)
  );
