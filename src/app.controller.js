import express from "express"
import authController from './modules/auth/auth.controller.js'
import userController from './modules/user/user.controller.js'
import messageController from './modules/message/message.controller.js'
import DBconnection from "./DB/connection/connection.js"
import { globalErrorHandling } from "./utils/error/error.js"
import { successResponse } from "./utils/response/success.response.js"
import cors from 'cors'
const bootstrap = (app, express) => {

    app.use(express.json()) // Buffer data converter

    app.use(
        cors({
            origin: '*',
            credentials: true,
        })
    );

    app.get('/', (req, res, next) => { // base route
        // return res.status(200).json({ message: 'Welcome to SarahaApplication Version 1.0.0' })
        return successResponse({ res, message: 'Welcome to SarahaApplication Version 1.0.0', status: 200 })
    })

    app.use('/auth', authController)
    app.use('/user', userController)
    app.use('/message', messageController)

    app.all("/*e", (req, res, next) => { // invalid routing
        // return res.status(404).json({ message: 'Page not Found!!' })
        return next(new Error('Page not Found!!', { cause: 404 }))
    })


    app.use(globalErrorHandling)


    DBconnection()
}

export default bootstrap