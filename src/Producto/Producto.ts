import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nombre: string;

  @Column("decimal")
  precio: number;

  @Column("bytea", { array: true })
  imagenes: Buffer[];

  @Column()
  categoria: string;
}
