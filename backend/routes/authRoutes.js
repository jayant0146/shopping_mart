import express from "express";
import { forgotPasswordController, loginController, registerController, testController } from "../controller/authController.js";
import { isAdmin, requiresSignin } from "../middleware/authMiddleware.js";

//router object -  if you are doing routing in separate file 
const router = express.Router();

//Register || Method POST
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgotpassword', forgotPasswordController);
router.get('/test', requiresSignin, isAdmin, testController);
router.get('/user-auth', requiresSignin, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router;