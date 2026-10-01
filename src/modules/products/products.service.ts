import { db } from "../../prisma/db.js";

export async function getProducts() {
  // return db.orm.public.Product.all();
  return db.orm.public.Product
  .where({ active: true })
  .all();
}

export async function getProductById(id: number) {
  return db.orm.public.Product
    .where({ id })
    .first();
}

export async function getProductByCode(code: string) {
  return db.orm.public.Product
    .where({ code })
    .first();
}

export async function createProduct(data: {
  code: string;
  name: string;
  stock: number;
  salePriceCents: number;
  costPriceCents: number;
  entryDate: string;
  active?: boolean;
}) {
  return db.orm.public.Product.create({
    code: data.code,
    name: data.name,
    stock: data.stock,
    salePriceCents: data.salePriceCents,
    costPriceCents: data.costPriceCents,
    entryDate: data.entryDate,
    active: data.active ?? true,
  });
}

export async function updateProduct(
  id: number,
  data: {
    code: string;
    name: string;
    stock: number;
    salePriceCents: number;
    costPriceCents: number;
    entryDate: string;
    active?: boolean;
  },
) {
  return db.orm.public.Product
    .where({ id })
    .update({
      code: data.code,
      name: data.name,
      stock: data.stock,
      salePriceCents: data.salePriceCents,
      costPriceCents: data.costPriceCents,
      entryDate: data.entryDate,
      active: data.active ?? true,
    });
}

export async function deactivateProduct(id: number) {
  return db.orm.public.Product
    .where({ id })
    .update({
      active: false,
    });
}

export async function activateProduct(id: number) {
  return db.orm.public.Product
    .where({ id })
    .update({
      active: true,
    });
}