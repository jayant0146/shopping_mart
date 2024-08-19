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
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
            if (err)
                res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if ((req.user.id === req.params.id) || req.user.isAdmin === 1) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};