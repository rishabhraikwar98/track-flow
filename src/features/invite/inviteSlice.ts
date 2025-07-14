import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/lib/axios";
import toast from "react-hot-toast";
export const fetchInvites = createAsyncThunk(
  "invites/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/invites");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const acceptInvite = createAsyncThunk(
  "invites/accept",
  async (inviteId: string, { rejectWithValue }) => {
    try {
      const res = await API.post(`/invites/accept/${inviteId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const ignoreInvite = createAsyncThunk(
  "invites/ignore",
  async (inviteId: string, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/invites/ignore/${inviteId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

interface projectId {
  _id: string;
  name: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}
interface Invite {
  _id: string;
  projectId: projectId;
}
interface InviteState {
  invites: Array<Invite>;
  loading: boolean;
  error: null | string;
}
const initialState: InviteState = {
  invites: [],
  loading: false,
  error: null,
};
const inviteSlice = createSlice({
  name: "invites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvites.fulfilled, (state, action) => {
        state.loading = false;
        state.invites = action.payload;
      })
      .addCase(fetchInvites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(acceptInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptInvite.fulfilled, (state, action) => {
        state.loading = false;
        const { inviteId } = action.payload;
        state.invites = state.invites.filter((item) => {
          return item._id !== inviteId;
        });
      })
      .addCase(acceptInvite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(ignoreInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ignoreInvite.fulfilled, (state, action) => {
        state.loading = false;
        const { inviteId } = action.payload;
        state.invites = state.invites.filter((item) => {
          return item._id !== inviteId;
        });
      })
      .addCase(ignoreInvite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default inviteSlice.reducer;
