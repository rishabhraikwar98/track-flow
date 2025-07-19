import API from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
export const fetchProjects = createAsyncThunk(
  "projects/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/projects");
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
    }
  }
);
export const fetchProjectById = createAsyncThunk(
  "projects/fetch-by-Id",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res = await API.get(`/projects/${projectId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const createProject = createAsyncThunk(
  "projects/create",
  async (data: { name: string; description: string }, { rejectWithValue }) => {
    try {
      const res = await API.post("/projects", data);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const updateProject = createAsyncThunk(
  "projects/update",
  async (
    data: { name: string; description: string; projectId: string },
    { rejectWithValue }
  ) => {
    try {
      const { projectId, name, description } = data;
      const payload = { name, description };
      const res = await API.patch(`/projects/${projectId}`, payload);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/projects/${projectId}`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const leaveProject = createAsyncThunk(
  "projects/leave",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/projects/${projectId}/leave`);
      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
