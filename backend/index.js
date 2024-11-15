import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./src/routes/authRoutes.js";
import { todoRouter } from "./src/routes/todoRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
