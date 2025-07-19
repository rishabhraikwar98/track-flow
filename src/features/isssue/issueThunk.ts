import API from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchIssuesByProject = createAsyncThunk(
  "issues/fetch",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/issues/${projectId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);
export const fetchIssueById = createAsyncThunk(
  "issues/fetch-by-id",
  async (issueId: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/issues/view/${issueId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);
export const createIssue = createAsyncThunk(
  "issues/create",
  async (data: any, { rejectWithValue }) => {
    const { projectId } = data;
    data.projectId = undefined;
    try {
      const res = await API.post(`/issues/${projectId}`, data);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);
export const updateIssue = createAsyncThunk(
  "issues/update",
  async (data: any, { rejectWithValue }) => {
    const { issueId } = data;
    data.issueId = undefined;
    try {
      const res = await API.patch(`/issues/${issueId}`,data);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);
export const deleteIssue = createAsyncThunk(
  "issues/delete",
  async (issueId:string, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/issues/${issueId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);