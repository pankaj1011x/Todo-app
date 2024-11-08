import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(user.id, process.env.JWT_SECRET);

    return res.json({
      token,
      message: "User account created successfully",
    });
  } catch (err) {
    return res.status(411).json({
      message: "error while signing up",
    });
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }
    const ispasswordValid = await bcrypt.compare(password, user.password);

    if (!ispasswordValid) {
      return res.status(401).json({
        msg: "incorrect password",
      });
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET);

    return res.json({
      token,
      message: "you are signed in",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "error while signing in",
    });
  }
}
