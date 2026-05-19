import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
dotenv.config();


const app = express();
const port = process.env.PORT || 5050

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongoDBURL)
.then(()=>{console.log('mongoose connected')})
.catch((err)=>{console.log('Not connected')})

app.use('/', routes)

app.listen(port,()=>console.log(`server is running port: http://localhost:${port}`))