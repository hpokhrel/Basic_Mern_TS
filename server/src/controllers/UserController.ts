import {
  getAllUsers,
  RegisterUser,
  SignInUser,
  SignOutUser,
} from "../services/UserServices";

export const createUser = RegisterUser;
export const loginUser = SignInUser;
export const logoutUser = SignOutUser;

export const getUsers = getAllUsers;
