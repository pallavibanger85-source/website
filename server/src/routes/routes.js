import express from 'express'
import {register,verify,login} from '../controller/controller.js'
const routes = express.Router();


routes.post('/register',register)
routes.post('/verify_otp/:id',verify)
routes.post('/login',login)

routes.use((req,res)=>{
res.status(404).send({status: false, success : false, msg : 'invalid url'})
})

export default routes;
