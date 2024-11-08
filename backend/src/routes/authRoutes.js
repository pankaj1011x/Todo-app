import express from "express";
import { signup } from "../controllers/authControllers.js";
import { signin } from "../controllers/authControllers.js";
export const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);
