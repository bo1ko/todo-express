import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const getRegister = (req, res) => {
    res.render("register", { title: "Register" });
};

export const postRegister = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash,
        });

        const user = await doc.save();

        res.render("todo");
    } catch (error) {
        res.status(500).render("register", {
            title: "Register",
            message: "Failed to register",
        });
    }
};

export const getLogin = (req, res) => {
    res.render("login", { title: "Login" });
}

export const postLogin = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValidPass) {
            return res.status(400).json({
                message: "Wrong name or password",
            });
        }

        res.render("todo");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to register",
        });
    }
};

export const getMe = async (req, res) => {
    try {
        console.log(req.userId);
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "No access",
        });
    }
};
