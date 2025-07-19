import API from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
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
      return { inviteId, ...res.data };
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
      return { inviteId, ...res.data };
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const sendInvite = createAsyncThunk(
  "invites/send",
  async (data: { email: string; projectId: string }, { rejectWithValue }) => {
    try {
      const res = await API.post(`/invites`, data);
      toast.success(`Invite sent to ${data.email}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
