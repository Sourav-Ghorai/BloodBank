import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createInventoryController,
  getDonarController,
  getHospitalController,
  getInventoryController,
  getInventoryHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getRecentBloodRecordController,
} from "../controllers/inventoryController.js";

const router = express.Router();

//Create Inventory
router.post("/create-inventory", requireSignIn, createInventoryController);

//Get all inventory
router.get("/get-inventory", requireSignIn, getInventoryController);

//Get all hospital inventory
router.post(
  "/get-inventory-hospital",
  requireSignIn,
  getInventoryHospitalController
);

//Get donars
router.get("/get-donar", requireSignIn, getDonarController);

//Get hospital
router.get("/get-hospital", requireSignIn, getHospitalController);

//Get Organization
router.get("/get-organization", requireSignIn, getOrganizationController);

//Get Organization for hospital
router.get(
  "/get-organization-for-hospital",
  requireSignIn,
  getOrganizationForHospitalController
);

router.get("/recent-inventory", requireSignIn, getRecentBloodRecordController);

export default router;
