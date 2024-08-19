import express from "express";
import { verifyToken, verifyTokenAndAuthorization } from "./verifyToken.js";
import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
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

export default router;