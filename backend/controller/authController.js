import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {

    try {
        const { fname, lname, email, password } = req.body;

        //check user 
        const exisitingUser = await userModel.findOne({ email });
        //check for exisisting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Resister please login"
            });
        }

        //Register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ fname, lname, email, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: "User Registration Successfully",
            user
        })


    } catch (error) {
        console.log("1234")
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check user 

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd"
            })
        }

        const match = await comparePassword(password, user.password);
        console.log(user, "fghj", match)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }
        //Token


        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                email: user.email,
                password: user.password,
            },

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
}