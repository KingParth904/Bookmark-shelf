import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {signupschema} from "./extras/zodschema";
import {ResponseStatus} from "./extras/Statuscodes.enum";
import { UserModel, ContentModel, TagModel, LinkModel } from './db';
import { jwt_passkey } from "./extras/passwords";
import { userMiddleware } from "./middleware";
import { AuthenticatedRequest } from "./middleware";
const app  = express();
app.use(express.json());

app.post('/api/v1/signup', async (req, res) => {
  try {
    const { username, password } = signupschema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      username,
      password: hashedPassword,
    });

    res.status(ResponseStatus.Success).json({
      message: 'User signed up successfully',
    });
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(ResponseStatus.Conflict).json({
        message: 'User already exists',
      });
    }

    console.error(e);
    res.status(ResponseStatus.Error).json({
      message: 'Something went wrong',
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = signupschema.parse(req.body);

    const existinguser = await UserModel.findOne({ username });
    if (!existinguser || !existinguser.password) {
        return res.status(404).json({ message: "User does not exist or password missing" });
}

const passmatch = await bcrypt.compare(password, existinguser.password);

    if (!passmatch) {
      return res.status(ResponseStatus.Unauthorized).json({
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign(
      { id: existinguser._id },
      jwt_passkey
    );

    return res.status(ResponseStatus.Success).json({
      message: "Login successful",
      token,
    });
  } catch (e: any) {
    console.error(e);
    return res.status(ResponseStatus.Error).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
});

app.post("/api/v1/content",userMiddleware , async (req : AuthenticatedRgit equest,res)=>{
     const { title, link, type } = req.body;

    try {
        const content = await ContentModel.create({
        title,
        link,
        type,
        tags: [], 
        userId: req.userId,
        });

        res.status(201).json({
        message: "Content created successfully",
        content,
        });
    } catch (e: any) {
        res.status(500).json({
        message: "Failed to create content",
        error: e.message,
        });
    }
});

app.get("/api/v1/content", userMiddleware, async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  try {
    const content = await ContentModel.find({ userId })
      .populate("userId", "username");

    res.status(200).json({ content });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch content", error: err.message });
  }
});

app.delete("/api/v1/content",async (req:AuthenticatedRequest,res)=>{
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        userId : req.userId
    })
    res.json({
        message : "Deleted"
    })
});

app.post("/api/v1/content",(req,res)=>{

})


async function main(){
    await mongoose.connect("mongodb+srv://parthsadotra33:39ipoDAz6BXZUiSB@cluster0.5ypptcz.mongodb.net/bookmark-shelf");
    console.log("Server Started");
    app.listen(3000);
}

main(); 