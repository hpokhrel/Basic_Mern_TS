import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT: number | string = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL as string;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

import productRoute from "./routes/Products";
import userRoute from "./routes/UserRoute";
app.use("/api", productRoute);
app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Backend!");
});

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error: any) =>
    console.error("MongoDB connection error:", error.message)
  );

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
