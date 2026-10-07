// import { number } from "joi";
import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        minLength: [2, 'user must be at at least 2 characters'],
        maxLength: [30, 'user must be at at most 20 characters'],
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    dateOfBirth: Date,
    address: String,
    phone: String,
    image: String,
    age: Number,

    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }

}, { timestamps: true })

const UserModel = mongoose.models.User || model('User', userSchema)

export default UserModel