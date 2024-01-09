import express from "express";
import { loginController, registerController } from "../controller/authController.js";

//router object -  if you are doing routing in separate file 
const router = express.Router();

//Register || Method POST
router.post('/register', registerController);
router.post('/login', loginController);

//Login || POST
// router.post('/login', loginController);

export default router;