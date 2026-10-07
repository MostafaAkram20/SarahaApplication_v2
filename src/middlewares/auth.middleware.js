import jwt from 'jsonwebtoken'
import UserModel from '../DB/models/User.model.js';

export const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new Error('Token Required', { cause: 401 }))
        }
        // token = bearer rnbrjrbwoiwengvipewvienb
        const [signature, token] = authorization.split(" ");
        if (!signature || !token) {
            return next(new Error('Invalid Token Structure', { cause: 400 }))
        }

        let token_signature = undefined;

        switch (signature) {
            case 'admin':
                token_signature = process.env.TOKEN_SIGNATURE_ADMIN
                break;

            case 'Bearer':
                token_signature = process.env.TOKEN_SIGNATURE
                break;
        }
        const decodedToken = jwt.verify(token, token_signature)
        console.log(decodedToken);
        const user = await UserModel.findById(decodedToken.id)

        if (!user) {
            return next(new Error('User not found', { cause: 401 }))
        }

        req.user = user

        return next();

    } catch (error) {
        return next(error)
    }

}