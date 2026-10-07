import { successResponse } from "../../../utils/response/success.response.js"

export const getAllMessages = (req , res , next)=>{
    try {
        return successResponse({res , message:'all messages' , data:{}})
    } catch (error) {
        return next(error)
    }
}

