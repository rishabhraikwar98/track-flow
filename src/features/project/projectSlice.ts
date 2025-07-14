import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/lib/axios";
import toast from "react-hot-toast";
type Member = {
  _id: string;
  name: string;
  email: string;
};
type Project = {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: Member;
  members: Array<Member>;
};
interface ProjectState {
  projects: Array<Project>;
  loading: boolean;
  error: string | null;
}
export const fetchProjects = createAsyncThunk("projects/fetch", async (_,{rejectWithValue}) => {
  try {
    const res = await API.get("/projects");
    return res.data;
  } catch (error:any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error);
  }
});
export const createProject = createAsyncThunk(
  "projects/create",
  async (data: { name: string; description: string },{rejectWithValue}) => {
    try {
      const res = await API.post("/projects",data);
      return res.data;
    } catch (error :any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProject.pending,(state)=>{
        state.loading = true
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
      })
      .addCase(createProject.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload as string
      })
  },
});

export default projectSlice.reducer;
