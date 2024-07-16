import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createInventoryController,
  getDonarController,
  getHospitalController,
  getInventoryController,
  getOrganizationController,
} from "../controllers/inventoryController.js";

const router = express.Router();

//Create Inventory
router.post("/create-inventory", requireSignIn, createInventoryController);

//Get all inventory
router.get("/get-inventory", requireSignIn, getInventoryController);

//Get donars
router.get("/get-donar", requireSignIn, getDonarController);

//Get hospital
router.get("/get-hospital", requireSignIn, getHospitalController);

//Get Organization
router.get("/get-organization", requireSignIn, getOrganizationController);

export default router;
