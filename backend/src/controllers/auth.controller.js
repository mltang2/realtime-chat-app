import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async(req, res) => {
    const{fullName,email,password} = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required"});
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters"});
        }

        const user = await User.findOne({email});

        if (user) return res.status(400).json({ message: "Email aready exists with an account"});
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error "});
    }
};

export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};