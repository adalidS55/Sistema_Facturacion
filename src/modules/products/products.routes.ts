import { Router } from "express";

import { createProductHandler, getProductHandler, listProducts, updateProductHandler, deleteProductHandler, activateProductHandler} from "./products.controller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductHandler);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);
router.patch("/:id/activate", activateProductHandler);

export default router;