import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./src/routes/authRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
