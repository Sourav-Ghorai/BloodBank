import express from "express";
import { currentUserController, loginController, registerController } from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Register
router.post('/register', registerController);

//Login
router.post('/login', loginController);

//Get current user
router.get('/current-user', requireSignIn, currentUserController);

export default router;