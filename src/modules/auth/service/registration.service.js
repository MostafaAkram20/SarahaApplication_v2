import UserModel from "../../../DB/models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js";
import { sendEmail } from "../../../utils/email/send.email.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { compareHash, generateHash } from "../../../utils/security/hash.js";
import { generateDecryption, generateEncryption } from "../../../utils/security/encrypt.js";
import { generateToken, verifyToken } from "../../../utils/token/token.js";
// import { options } from "joi";
// import { globalErrorHandling } from "../../../utils/error/error.js";

export const signup = async (req, res, next) => {

    try {
        const { userName, email, password, confirmePassword, age, gender, phone, role } = req.body

        if (!userName || !email || !password || !confirmePassword || !gender || !phone || !age) {
            return next(new Error('please fill all data', { cause: 400 }))
        }

        if (password !== confirmePassword) {
            return next(new Error('password is not match with password confirmation ', { cause: 400 }))
        }

        const isExistedEmail = await UserModel.findOne({ email })
        const isExistedUserName = await UserModel.findOne({ userName })
        if (isExistedEmail) {
            return next(new Error('Email address is already exist', { cause: 409 }))
        }

        if (isExistedUserName) {
            return next(new Error('Username is already exist.. try another one', { cause: 409 }))
        }

        const hashedPassword = generateHash({ plantText: password, salt: 10 })
        const encryptedPhone = generateEncryption({ plantText: phone, encryptionPassword: process.env.PHONE_ENCRYPTION })

        const user = await UserModel.create({
            userName, email, password: hashedPassword, age, gender, phone: encryptedPhone, role
        })

        const emailToken = generateToken({ payload: { email }, signature: process.env.EMAIL_CONFIRMATION_TOKEN, options: { expiresIn: 3600 } })
        const emailLink = `https://localhost:3000/confirm-email?token=${emailToken}`

        await sendEmail({
            to: email,
            subject: `Email Confirmation from Saraha Application to ${user.userName} `,
            text: `Please click the link below to confirm your email ${emailToken}`,
            html: `<a href='${emailLink}'>Click me to confirm your email ${emailToken}</a>`
        })

        return successResponse({ res, message: 'user is created successfully.. Please Confirm your email address', data: { user }, status: 201 })

    } catch (error) {
        return next(error)
    }
}


export const ConfirmEmail = async (req, res, next) => {

    try {
        const { token } = req.query;

        if (!token) {
            return next(new Error('Token is required', { cause: 400 }))
        }

        const decodedToken = verifyToken({ token: token, signature: process.env.EMAIL_CONFIRMATION_TOKEN })

        const user = await UserModel.findOneAndUpdate({ email: decodedToken.email }, { confirmEmail: true }, { new: true })

        return successResponse({ res, message: "User Confirmed Successfully..", data: { user }, status: 200 })
    } catch (error) {
        return next(error)
    }
}


export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new Error('missing an input data', { cause: 400 }))
        }


        const user = await UserModel.findOne({ email })


        if (!user) {
            return next(new Error('Invalid email or password', { cause: 401 }))
        }

        if (!user.confirmEmail) {
            return next(new Error('Please Confirm your Email First', { cause: 403 }))
        }

        const isMatchedPassword = compareHash({ plantText: password, hashedValue: user.password })

        if (!isMatchedPassword) {
            return next(new Error('Invalid email or password', { cause: 401 }))
        }


        const decryptedPhone = generateDecryption({ cypherText: user.phone, deCryptionPassword: process.env.PHONE_ENCRYPTION })
        user.phone = decryptedPhone

        const token = generateToken({
            payload: { id: user._id, isloggedIn: true },
            signature: user.role == 'admin' ? process.env.TOKEN_SIGNATURE_ADMIN : process.env.TOKEN_SIGNATURE, options: { expiresIn: 3600 }
        })

        return successResponse({ res, message: 'Done', data: { token, user } })

    } catch (error) {
        return next(error)
    }
}