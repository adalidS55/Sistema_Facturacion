import express from "express";
import cors from "cors";
import { db } from "./prisma/db.js";
import productsRoutes from "./modules/products/products.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Sistema de facturación API funcionando",
  });
});

app.get("/api/health/database", async (_req, res) => {
  try {
    const products = await db.orm.public.Product.all();

    res.json({
      status: "ok",
      database: "connected",
      products,
    });
  } catch (error) {
    console.error("Error de conexión con la base de datos:", error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

export default app;