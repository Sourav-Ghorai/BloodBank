import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createInventoryController, getInventoryController } from "../controllers/inventoryController.js";

const router = express.Router();

//Create Inventory
router.post('/create-inventory', requireSignIn, createInventoryController);

//Get all inventory
router.get('/get-inventory', requireSignIn, getInventoryController);

export default router;