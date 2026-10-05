import { db } from "../../prisma/db.js";

function normalizeProduct<T extends { stock: unknown }>(product: T) {
  return {
    ...product,
    stock: Number(product.stock),
  };
}

export async function getProducts() {
  const products = await db.orm.public.Product
    .where({ active: true })
    .all();

  return products.map(normalizeProduct);
}

export async function getProductById(id: number) {
  const product = await db.orm.public.Product
    .where({ id })
    .first();

  return product ? normalizeProduct(product) : null;
}

export async function getProductByCode(code: string) {
  const product = await db.orm.public.Product
    .where({ code })
    .first();

  return product ? normalizeProduct(product) : null;
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
    stock: data.stock.toFixed(2),
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
      stock: data.stock.toFixed(2),
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