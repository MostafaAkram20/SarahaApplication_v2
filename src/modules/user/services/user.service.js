// import jwt from 'jsonwebtoken'

import { successResponse } from "../../../utils/response/success.response.js"
import { generateDecryption } from "../../../utils/security/encrypt.js"


export const profile = async (req, res, next) => {
    try {

        const decryptedPhone = generateDecryption({ cypherText: req.user.phone, deCryptionPassword: process.env.PHONE_ENCRYPTION })
        // req.user.phone = decryptedPhone




        return successResponse({ res, message: 'user profile', data: { user: req.user.userName, email: req.user.email, phone: decryptedPhone, role: req.user.role, gender: req.user.gender }, status: 200 })

    } catch (error) {
        return next(error)
    }
}

export const updateProfile = async (req, res, next) => {
    try {


        //USER UPDATE LOGIC SOON
        //USER UPDATE LOGIC SOON
        //USER UPDATE LOGIC SOON
        //USER UPDATE LOGIC SOON
        //USER UPDATE LOGIC SOON
        //USER UPDATE LOGIC SOON
        //USER UPDATE LOGIC SOON

        successResponse({ res, message: 'user updated', data: { user: req.user } })

    } catch (error) {
        return next(error)
    }
}

