const jwt = require('jsonwebtoken');

const userModel = require("../models/user.model");
//const userSignin = require("../models/user.model");

const registerUser = async (req, res) => {
    const { profilePicture, userName, password, email } = req.body;

    try {
        if (!profilePicture || !userName || !password || !email) {
            return res.status(400).send({ message: "profilePicture, userName, password, and email are required" });
        }
        const existingUser = await userModel.findOne({ userName });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" });
        }
        const user = new userModel({profilePicture, userName, password, email });
        const data = await user.save();
        res.send({ message: "User added successfully!", data });
    } catch (err) {
        console.error("Error adding user:", err.message);
        res.status(500).send({ message: "An error occurred while creating the user." });
    }
}

const loginUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await userModel.findOne({ userName });
        if (!user) {
            return res.status(400).send({ message: "User not found!" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid password!" });
        }

        const tokenPayload = { userName: user.userName, email: user.email };
        const token = jwt.sign(tokenPayload, 'your_jwt_secret', { expiresIn: '1h' });

        res.send({ message: "Login Successful!", token, role: user.email });
    } catch (err) {
        console.error("Error logging in user:", err.message);
        res.status(500).send({ message: "An error occurred while logging in the user." });
    }
}

const userDashboard = async (req, res) => {
    const { userName } = req.body;

    try {
        const user = await userModel.findOne({ userName });
        if (!user) {
            return res.status(400).send({ message: "User not found!" });
        }

        res.send({ message: "User found successfully!", user });
    } catch (err) {
        console.error("Error finding user:", err.message);
        res.status(500).send({ message: "An error occurred while finding the user." });
    }
}

module.exports = {
    registerUser,
    loginUser,
    userDashboard,
}