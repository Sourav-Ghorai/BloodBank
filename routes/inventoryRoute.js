import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware";
import { createInventoryController } from "../controllers/inventoryController";

const router = express.Router();

//Create Inventory
router.post('/create-inventory', requireSignIn, createInventoryController);

export default router;