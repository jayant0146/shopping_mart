import express from "express";
import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import { isAdmin, verifyTokenAndAuthorization } from "../middleware/authMiddleware.js";
const router = express.Router();

//Update the user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    // as user can change its password
    if (req.body.password) {
        req.body.password = await hashPassword(req.body.password);
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER
router.get("/find/:id", verifyTokenAndAuthorization, isAdmin, async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USER
router.get("/all-users",verifyTokenAndAuthorization, isAdmin, async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;