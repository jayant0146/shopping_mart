import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        if (!name) {
            return res.send({ success: false, message: "Name is Required" });
        }
        if (!email) {
            return res.send({ success: false, message: "Email is Required" });
        }
        if (!password) {
            return res.send({ success: false, message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ success: false, message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ success: false, message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ success: false, message: "Security Answer is Required" });
        }

        //check user 
        const exisitingUser = await userModel.findOne({ email });
        //check for exisisting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login"
            });
        }

        //Register user
        const hashedPassword = await hashPassword(password);

        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();
        res.status(201).send({
            success: true,
            message: "User Registration Successfully",
            user
        })
    } catch (error) {
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
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Wrong Credentials"
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "EMail not registered"
            })
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //tokenss
        console.log(user);
        const token = JWT.sign({ id: user._id, isAdmin: user.role }, process.env.JWT_SECRETKEY, { expiresIn: "2d" });

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
                role: user.role,
            }, token,
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

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body;

        if (!email) {
            return res.send({ success: false, message: "Email is Required" });
        }
        if (!answer) {
            return res.send({ success: false, message: "Security Answer is Required" });
        }
        if (!newpassword) {
            return res.send({ success: false, message: "New Password is Required" });
        }

        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Credentials"
            })
        }

        const hash = await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user.id, { password: hash });
        return res.status(200).send({
            success: true,
            message: "Password Updated Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Password Updation',
            error
        });
    }
}

export const testController = (req, res) => {
    res.send("Protected Routes");
}