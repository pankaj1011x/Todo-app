import { prisma } from "../config/db.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validators/todoValidators.js";
export async function createTodo(req, res) {
  const payload = req.body;
  const validatedPayload = createTodoSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return res.status(400).json({
      msg: "invalid inputs",
    });
  }

  const userId = req.user;
  try {
    const todo = await prisma.todo.create({
      data: {
        title: payload.title,
        description: payload.description,
        userId,
      },
    });
    return res.status(201).json({
      todo,
      msg: "todo created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: `error creating a todo ${err}`,
    });
  }
}
export async function getTodos(req, res) {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user,
      },
      select: {
        title: true,
        description: true,
        id: true,
        done: true,
        userId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.json({
      todos,
    });
  } catch (err) {
    return res.status(400).json({
      message: `error fetching todos ${err}`,
    });
  }
}
export async function updateTodo(req, res) {
  const payload = req.body;
  const validatedPayload = updateTodoSchema.safeParse(payload);
  if (!validatedPayload.success) {
    return res.status(400).json({
      msg: "invalid inputs",
    });
  }
  const updatedData = {};
  if (payload.title) updatedData.title = payload.title;
  if (payload.description) updatedData.description = payload.description;
  if (payload.done) updatedData.done = payload.done;
  const { id } = req.params;

  try {
    const todo = await prisma.todo.update({
      where: {
        id,
        userId: req.id,
      },
      data: updatedData,
    });
    return res.json({
      todo,
      message: "todo updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: `Unable to update todo ${err}` });
  }
}

export async function deleteTodo(req, res) {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.delete({
      where: {
        id,
        userId: req.id,
      },
    });

    return res.status(204).json({
      message: "todo deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "unable to delete todo" });
  }
}
