import express from "express";
import { loginController, registerController, testController } from "../controller/authController.js";
import { isAdmin, requiresSignin } from "../middleware/authMiddleware.js";

//router object -  if you are doing routing in separate file 
const router = express.Router();

//Register || Method POST
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/test', requiresSignin, isAdmin, testController);

export default router;