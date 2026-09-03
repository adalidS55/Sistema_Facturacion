import type { Request, Response } from "express";

import { createProduct, getProductByCode, getProductById, getProducts, } from "./products.service.js";

export async function listProducts(
  _req: Request,
  res: Response,
) {
  try {
    const products = await getProducts();
    res.json({
      status: "ok",
      products,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      status: "error",
      message: "No se pudieron obtener los productos",
    });
  }
}

export async function getProductHandler(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        status: "error",
        message: "El ID del producto no es válido",
      });
    }
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }
    return res.json({
      status: "ok",
      product,
    });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener el producto",
    });
  }
}

export async function createProductHandler(
  req: Request,
  res: Response,
) {
  try {
    const { code, name, stock, salePriceCents, costPriceCents, entryDate, active, } = req.body;
    if (
      typeof code !== "string" ||
      code.trim().length === 0
    ) {
      return res.status(400).json({
        status: "error",
        message: "El código del producto es obligatorio",
      });
    }
    if (
      typeof name !== "string" ||
      name.trim().length === 0
    ) {
      return res.status(400).json({
        status: "error",
        message: "El nombre del producto es obligatorio",
      });
    }
    if (
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return res.status(400).json({
        status: "error",
        message: "El stock debe ser un número entero mayor o igual a 0",
      });
    }
    if (
      !Number.isInteger(salePriceCents) ||
      salePriceCents < 0
    ) {
      return res.status(400).json({
        status: "error",
        message: "El precio de venta debe ser un entero mayor o igual a 0",
      });
    }
    if (
      !Number.isInteger(costPriceCents) ||
      costPriceCents < 0
    ) {
      return res.status(400).json({
        status: "error",
        message: "El precio de costo debe ser un entero mayor o igual a 0",
      });
    }
    if (
      typeof entryDate !== "string" ||
      Number.isNaN(Date.parse(entryDate))
    ) {
      return res.status(400).json({
        status: "error",
        message: "La fecha de entrada no es válida",
      });
    }
    if (
      active !== undefined &&
      typeof active !== "boolean"
    ) {
      return res.status(400).json({
        status: "error",
        message: "El campo active debe ser booleano",
      });
    }

    const normalizedCode = code.trim();
    const existingProduct = await getProductByCode(normalizedCode);
    if (existingProduct) {
      return res.status(409).json({
        status: "error",
        message: "Ya existe un producto con ese código",
      });
    }

    const product = await createProduct({
      code: normalizedCode,
      name: name.trim(),
      stock,
      salePriceCents,
      costPriceCents,
      entryDate,
      active,
    });
    return res.status(201).json({
      status: "ok",
      product,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo crear el producto",
    });
  }
}