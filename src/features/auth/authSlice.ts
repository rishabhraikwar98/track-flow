import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, logout } from "./authService";

interface User {
  _id: string;
  name: string;
  email: string;
}
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const currentUser = createAsyncThunk(
  "auth/current-user",
  async (_, thunkAPI) => {
    try {
      const response = await getCurrentUser();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout-user",
  async (_, thunkAPI) => {
    try {
      const response = await logout();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default authSlice.reducer;
