const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserModel = require("../modules/user.model")
require('dotenv').config();

async function registercontroller(req, res) {
    try {
        const { email, password, bio, username } = req.body

        const isuserExist = await UserModel.findOne({
            $or: [{ email }, { username }]
        })

        if (isuserExist) {
            return res.status(409).json({
                message: isuserExist.email === email ? "Email already exists" : "Username already exists"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            email,
            password: hash,
            bio,
            username
        })

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        res.status(201).json({
            message: 'User successfully registered',
            user: {
                email: user.email,
                username: user.username,
                bio: user.bio
            }
        })
    } catch (error) {
        console.error("Register Error:", error)
        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}

async function logincontroller(req, res) {
    try {
        const { email, password, username } = req.body

        const user = await UserModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Password is invalid"
            })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        res.status(200).json({
            message: 'User successfully logged in',
            user: {
                email: user.email,
                username: user.username,
                bio: user.bio
            }
        })
    } catch (error) {
        console.error("Login Error:", error)
        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}

async function getMeController(req, res) {
    try {
        const user = await UserModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            email: user.email,
            username: user.username,
            bio: user.bio
        })
    } catch (error) {
        console.error("Get Me Error:", error)
        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}


module.exports = {
    registercontroller,
    logincontroller,
    getMeController
}