import model from '../model/model.js'
import { validName, validEmail, validPassword, validGender } from '../validation/validation.js'
import { verification_otp, resend_otp } from '../mail/mail.js'
import { error } from '../errorhandling/error.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const register = async (req, res) => {
  try {
    const data = req.body
    const { name, email, password, gender } = data
    const randomotp = crypto.randomInt(1000, 9000)
    const expiretime = Date.now() + 5 * 60 * 1000;
    // const randomotp = Math.floor(1000+Math.random()*9000)



    const checkUser = await model.findOneAndUpdate({ email: email },
      {
        $set: { 'verification.user.otp': randomotp, 'verification.user.otpExpireTime': expiretime }
      })
    if (checkUser) {
      if (checkUser.verification.user.isVerify) return res.status(400).send({ status: false, msg: 'user already verify please login' })
      verification_otp(email, checkUser.name, randomotp)
      return res.status(200).send({ status: true, msg: 'resent otp send', id: checkUser._id })

    }
    const DBData = {
      name, email, gender, password, verification: { user: { otp: randomotp, otpExpireTime: expiretime } }
    }


    const DB = await model.create(DBData)
    verification_otp(email, name, randomotp)
    res.status(200).send({ status: true, success: true, msg: 'user account created', data: DB })

  }
  catch (err) {
    res.status(500).send({ status: false, success: false, msg: err.message })
  }

}
export const verify = async (req, res) => {
  try {
    const { id } = req.params;
    const { userotp } = req.body;

    if (!userotp) {
      return res.status(400).send({ status: false, msg: "pls provides otp" })
    }
    const user = await model.findById(id);
    if (!user) { return res.status(404).send({ status: false, msg: "user not found" }) }

    const { otp, otpExpireTime, isVerify } = user.verification.user;
    if (isVerify) { return res.status(400).send({ status: false, msg: "user already verified please login" }) }

    if (!(Date.now() <= otpExpireTime)) { return res.status(400).send({ status: false, msg: "otp time is expire please resent otp" }) }

    if (otp != userotp) return res.status(400).send({ status: false, msg: "wrong otp" })
    await model.findByIdAndUpdate({ _id: id }
      ,
      {
        $set: { 'verification.user.isVerify': true }
      }
    )
    return res.status(200).send({ status: true, msg: "account verified successfully please login.." })
  }
  catch (err) {
    res.status(500).send({ status: false, success: false, msg: err.message })
  }

}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await model.findOne({ email: email })
    if (!user) return res.status(404).send({ status: false, msg: "user not found" })
    if (user) {
      const { isVerify, isDelete, block } = user.verification.user
      if (!isVerify) return res.status(404).send({ status: false, msg: " please verify otp" })
      if (isDelete) return res.status(404).send({ status: false, msg: "account is deleted" })
      if (block) return res.status(404).send({ status: false, msg: "your account is blocked" })
    }
    const checkpass = await bcrypt.compare(password, user.password)
    if (!checkpass) return res.status(404).send({ status: false, msg: "wrong password" })
    const token = jwt.sign({ id: user.id }, process.env.usertokenkey, { expiresIn: '1d' })
    res.status(200).send({ status: true, msg: "login successfully", token, id: user._id })
  }

  catch (err) {
    res.status(500).send({ status: false, success: false, msg: err.message })
  }

}