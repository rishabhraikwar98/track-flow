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
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
}
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
  "projects/fetchById",
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
      const payload = {name,description}
      const res = await API.patch(`/projects/${projectId}`,payload);
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
  async (
    data: {projectId: string },
    { rejectWithValue }
  ) => {
    try {
      const { projectId} = data;
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
const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
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
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
