import { configureStore } from "@reduxjs/toolkit";
import productSlice, { ProductState } from "./slices/ProductSlice";
import authSlice, { AuthState } from "./slices/UserSlice";
import { useDispatch } from "react-redux";

export interface RootState {
  product: ProductState;
  auth: AuthState;
}

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
