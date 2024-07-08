import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

interface User {
  name: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface RegisterResponse {
  user: User;
  token: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface MyAsyncThunkConfig {
  rejectValue: {
    message: string;
  };
}

export const register: AsyncThunk<RegisterResponse, User, MyAsyncThunkConfig> =
  createAsyncThunk<RegisterResponse, User, MyAsyncThunkConfig>(
    "auth/register",
    async (user: User, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/user/register",
          user
        );
        return response.data;
      } catch (err: any) {
        return rejectWithValue({
          message: err.response.data.message || "Registration failed",
        });
      }
    }
  );

export const login: AsyncThunk<LoginResponse, LoginUser, MyAsyncThunkConfig> =
  createAsyncThunk<LoginResponse, LoginUser, MyAsyncThunkConfig>(
    "auth/login",
    async (credentials: LoginUser, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/user/login",
          credentials
        );
        return response.data;
      } catch (err: any) {
        return rejectWithValue({
          message: err.response.data.message || "Login failed",
        });
      }
    }
  );

export const logout: AsyncThunk<void, void, MyAsyncThunkConfig> =
  createAsyncThunk<void, void, MyAsyncThunkConfig>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/user/logout");
        return response.data;
      } catch (err: any) {
        return rejectWithValue({
          message: err.response.data.message || "Logout failed",
        });
      }
    }
  );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Logout failed";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
