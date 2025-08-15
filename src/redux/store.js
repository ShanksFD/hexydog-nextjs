import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import blogReducer from "./slices/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore all actions that might contain Firebase user objects
        ignoredActions: ["auth/setUser", "auth/login/fulfilled"],
        // Ignore paths that might contain non-serializable values
        ignoredActionPaths: [
          "payload.user",
          "meta.arg.user",
          "meta.arg.blogData.createdAt",
          "meta.arg.blogData.updatedAt",
        ],
        // Ignore these paths in the state
        ignoredPaths: ["auth.user"],
      },
    }),
});
