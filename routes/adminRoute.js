import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { deleteDonarController, getDonarListController, getHospitalListController, getOrganizationListController } from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

//Get Donar List
router.get('/donar-list', requireSignIn, isAdmin, getDonarListController)

//Get hospital List
router.get('/hospital-list', requireSignIn, isAdmin, getHospitalListController)

//Get Donar List
router.get('/org-list', requireSignIn, isAdmin, getOrganizationListController)

router.delete('/delete-donar/:id', requireSignIn, isAdmin, deleteDonarController);

export default router;
