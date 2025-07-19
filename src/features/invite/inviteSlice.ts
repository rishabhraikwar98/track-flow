import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInvites,
  ignoreInvite,
  acceptInvite,
  sendInvite,
} from "./inviteThunk";
interface project {
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
  project: project;
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
      })
      .addCase(sendInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendInvite.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendInvite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default inviteSlice.reducer;
