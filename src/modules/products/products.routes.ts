import { Router } from "express";

import { createProductHandler, getProductHandler, listProducts, } from "./products.controller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductHandler);
router.post("/", createProductHandler);

export default router;