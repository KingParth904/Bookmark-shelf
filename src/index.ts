import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


import {signupschema} from "./extras/zodschema"
import {ResponseStatus} from "./extras/Statuscodes.enum"

const app  = express();
app.use(express.json());


app.post("/api/v1/signup",async (req,res)=>{
    const {username,password} = signupschema.parse(req.body);

    

    const hashedpassword = await bcrypt.hash(password,5);

    

    
})
app.post("/api/v1/signin",(req,res)=>{

})
app.post("/api/v1/content",(req,res)=>{

})
app.get("/api/v1/content",(req,res)=>{

})
app.post("/api/v1/signup",(req,res)=>{

})
app.delete("/api/v1/content",(req,res)=>{

})
app.post("/api/v1/content",(req,res)=>{

})
