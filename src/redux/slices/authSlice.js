import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdTokenResult,
} from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  authChecked: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const tokenResult = await getIdTokenResult(userCredential.user);
      const isAdmin = !!tokenResult.claims.admin;

      return {
        user: userCredential.user,
        isAdmin,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

export const listenToAuthChanges = () => (dispatch) => {
  dispatch(setLoading(true));

  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const tokenResult = await getIdTokenResult(user);
        const isAdmin = !!tokenResult.claims.admin;

        dispatch(
          setUser({
            user,
            isAdmin,
          })
        );
      } catch (error) {
        console.error("Error getting token claims:", error);
        dispatch(
          setUser({
            user,
            isAdmin: false,
          })
        );
      }
    } else {
      dispatch(clearUser());
    }

    dispatch(setAuthChecked(true));
    dispatch(setLoading(false));
  });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.isAuthenticated = false;
      state.error = null;
    },
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAdmin = false;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setUser, clearUser, setAuthChecked, setLoading } =
  authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthChecked = (state) => state.auth.authChecked;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
