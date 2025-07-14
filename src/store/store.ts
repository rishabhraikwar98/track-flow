import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "@/features/auth/authSlice";
import inviteReducer from "@/features/invite/inviteSlice"
import projectReducer from "@/features/project/projectSlice"
 const store = configureStore({
  reducer: {
    auth: authReducer,
    invites:inviteReducer,
    projects:projectReducer
  }})
export default store;  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

