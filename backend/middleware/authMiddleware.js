import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requiresSignin = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRETKEY);
        req.user = decode;
        next();
    } catch (err) {
        res.send(err);
    }
}

//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (user.role === 0) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
};