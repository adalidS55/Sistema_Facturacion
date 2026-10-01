import type { Request, Response } from "express";
import { createProduct, getProductByCode, getProductById, getProducts, updateProduct, deactivateProduct, activateProduct } from "./products.service.js";
import { validateProduct } from "./products.validation.js";

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
    const validation = validateProduct(req.body);

    if (!validation.success) {
      return res.status(400).json({
        status: "error",
        message: validation.message,
      });
    }

    const data = validation.data;

    const existingProduct = await getProductByCode(data.code);

    if (existingProduct) {
      return res.status(409).json({
        status: "error",
        message: "Ya existe un producto con ese código",
      });
    }

    const product = await createProduct(data);

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

export async function updateProductHandler(
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

    const existingProduct = await getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    const validation = validateProduct(req.body);

    if (!validation.success) {
      return res.status(400).json({
        status: "error",
        message: validation.message,
      });
    }

    const data = validation.data;

    const productWithSameCode = await getProductByCode(data.code);

    if (
      productWithSameCode &&
      productWithSameCode.id !== id
    ) {
      return res.status(409).json({
        status: "error",
        message: "Ya existe otro producto con ese código",
      });
    }

    const product = await updateProduct(id, data);

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
    console.error("Error al actualizar producto:", error);

    return res.status(500).json({
      status: "error",
      message: "No se pudo actualizar el producto",
    });
  }
}

export async function deleteProductHandler(
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

    const existingProduct = await getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    if (!existingProduct.active) {
      return res.status(409).json({
        status: "error",
        message: "El producto ya está desactivado",
      });
    }

    const product = await deactivateProduct(id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    return res.json({
      status: "ok",
      message: "Producto desactivado correctamente",
      product,
    });
  } catch (error) {
    console.error("Error al desactivar producto:", error);

    return res.status(500).json({
      status: "error",
      message: "No se pudo desactivar el producto",
    });
  }
}

export async function activateProductHandler(
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

    const existingProduct = await getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    if (existingProduct.active) {
      return res.status(409).json({
        status: "error",
        message: "El producto ya está activo",
      });
    }

    const product = await activateProduct(id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    return res.json({
      status: "ok",
      message: "Producto reactivado correctamente",
      product,
    });
  } catch (error) {
    console.error("Error al reactivar producto:", error);

    return res.status(500).json({
      status: "error",
      message: "No se pudo reactivar el producto",
    });
  }
}