import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/UserController";
import express from "express";
const userRoute = express.Router();

userRoute.post("/register", createUser);
userRoute.post("/login", loginUser);

export default userRoute;
