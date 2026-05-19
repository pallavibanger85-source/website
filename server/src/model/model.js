import mongoose from 'mongoose'
import { validName, validEmail, validPassword, validGender } from '../validation/validation.js'
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    profileImg: { type: Object, required: false },
    name: {
        type: String, required: [true, 'name is required'], trim: true,
        validate: [validName, 'name is invalid']
    },
    email: {
        type: String, required: [true, 'email is required'], trim: true, unique: true, lowercase: true,
        validate: [validEmail, 'email is invalid']
    },
    password: {
        type: String, required: [true, 'password is required'], trim: true,
        validate: [validPassword, 'password is invalid']
    },
    gender: {
        type: String, required: [true, 'gender is required'], trim: true,
        validate: [validGender, 'gender is invalid'], enum: ['male', 'female', 'other']
    },
    verification: {
        user: {
            isVerify: { type: Boolean, default: false },
            otp: { type: Number, default: null },
            otpExpireTime: { type: Number, default: null },
            block: { type: Boolean, default: false },
            blockStatus: { type: String, enum: [], default: null },
            isDelete: { type: Boolean, default: false },
        },
        admin: {
            otp: { type: Number, default: null },
            isVerify: { type: Boolean, default: false },
        }
    }
})
userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10)    
})

export default mongoose.model('user', userSchema)