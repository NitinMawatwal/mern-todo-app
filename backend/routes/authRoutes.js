import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "user already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({ name, email, password: hashedPassword, });

        return res.json({ success: true, message: "User registered successfully" });
    } catch (e) {
        return res.json({ success: false, message: e.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "incorrect email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "incorrect password" });
        }
        
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        return res.json({
            success: true,
            message: "Login Successfully",
            token,
            user: {
                id:user._id,
                name:user.name,
                email:user.email
            }
        });
    } catch (e) {
        return res.json({ success: false, message: e.message });
    }
});

export default router;