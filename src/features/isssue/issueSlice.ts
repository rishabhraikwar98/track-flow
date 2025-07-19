import { createSlice } from "@reduxjs/toolkit";
import {
  createIssue,
  deleteIssue,
  fetchIssueById,
  fetchIssuesByProject,
  updateIssue,
} from "./issueThunk";

type Priority = "Low" | "Medium" | "High";

type Status = "Open" | "In_Progress" | "Closed";

export type Member = {
  _id: string;
  name: string;
  email: string;
};
export type Issue = {
  _id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdBy: Member;
  assignedTo: Member | string | null;
  createdAt: string;
};
interface IssueState {
  issues: Array<Issue>;
  selectedIssue: Issue | null;
  loading: boolean;
  error: string | null;
}

const initialState: IssueState = {
  issues: [],
  selectedIssue: null,
  loading: false,
  error: null,
};
const issueSlice = createSlice({
  name: "issues",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIssuesByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(fetchIssuesByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchIssueById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssueById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedIssue = action.payload;
      })
      .addCase(fetchIssueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues.unshift(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedIssue = action.payload;
        state.issues = state.issues.map((issue) =>
          issue._id === action.payload._id ? action.payload : issue
        );
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIssue.fulfilled, (state) => {
        state.loading = false;
        state.issues = state.issues.filter(
          (issue) => issue._id !== state.selectedIssue?._id
        );
        state.selectedIssue = null;
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default issueSlice.reducer;
