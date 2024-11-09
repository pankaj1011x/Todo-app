import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoControllers.js";
import { auth } from "../middleware/authMiddleware.js";

export const todoRouter = express.Router();
todoRouter.use(auth);
todoRouter.post("/", createTodo);
todoRouter.get("/", getTodos);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);
