import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getBloodGroupDetailsController } from "../controllers/analyticsController.js";

const router = express.Router();

//Get blood group details for analytics
router.get("/bloodgroup-details", requireSignIn, getBloodGroupDetailsController);

export default router;
