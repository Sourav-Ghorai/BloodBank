import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getDonarListController } from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

//Get Donar List
router.get('/donar-list', requireSignIn, isAdmin, getDonarListController)

export default router;
