export type CreateProductInput = {
  code: string;
  name: string;
  stock: number;
  salePriceCents: number;
  costPriceCents: number;
  entryDate: string;
  active?: boolean;
};

type ValidationResult =
  | {
    success: true;
    data: CreateProductInput;
  }
  | {
    success: false;
    message: string;
  };

export function validateProduct(
  body: unknown,
): ValidationResult {
  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    return {
      success: false,
      message: "El cuerpo de la solicitud no es válido",
    };
  }

  const data = body as Record<string, unknown>;

  if (
    typeof data.code !== "string" ||
    data.code.trim().length === 0
  ) {
    return {
      success: false,
      message: "El código del producto es obligatorio",
    };
  }

  if (
    typeof data.name !== "string" ||
    data.name.trim().length === 0
  ) {
    return {
      success: false,
      message: "El nombre del producto es obligatorio",
    };
  }

  if (
    !Number.isInteger(data.stock) ||
    (data.stock as number) < 0
  ) {
    return {
      success: false,
      message: "El stock debe ser un número entero mayor o igual a 0",
    };
  }

  if (
    !Number.isInteger(data.salePriceCents) ||
    (data.salePriceCents as number) < 0
  ) {
    return {
      success: false,
      message:
        "El precio de venta debe ser un entero mayor o igual a 0",
    };
  }

  if (
    !Number.isInteger(data.costPriceCents) ||
    (data.costPriceCents as number) < 0
  ) {
    return {
      success: false,
      message:
        "El precio de costo debe ser un entero mayor o igual a 0",
    };
  }

  if (
    typeof data.entryDate !== "string" ||
    Number.isNaN(Date.parse(data.entryDate))
  ) {
    return {
      success: false,
      message: "La fecha de entrada no es válida",
    };
  }

  if (
    data.active !== undefined &&
    typeof data.active !== "boolean"
  ) {
    return {
      success: false,
      message: "El campo active debe ser booleano",
    };
  }

  return {
    success: true,
    data: {
      code: data.code.trim(),
      name: data.name.trim(),
      stock: data.stock as number,
      salePriceCents: data.salePriceCents as number,
      costPriceCents: data.costPriceCents as number,
      entryDate: data.entryDate,
      active: data.active as boolean | undefined,
    },
  };
}