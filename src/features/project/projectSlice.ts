import { createSlice } from "@reduxjs/toolkit";
import {
  leaveProject,
  fetchProjects,
  fetchProjectById,
  createProject,
  deleteProject,
  updateProject,
} from "./projectThunk";

export type Member = {
  _id: string;
  name: string;
  email: string;
};
export type Project = {
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
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.loading = false;
        state.selectedProject = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(leaveProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leaveProject.fulfilled, (state) => {
        state.loading = false;
        state.selectedProject = null;
      })
      .addCase(leaveProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
