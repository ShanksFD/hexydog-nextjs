import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../firebase";

// Initialize Firestore
const db = getFirestore(app);

// Helper function to serialize timestamps and handle null values
const serializeData = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    // Convert Firestore timestamps to serializable format or use null
    createdAt: data.createdAt ? data.createdAt.toMillis() : null,
    updatedAt: data.updatedAt ? data.updatedAt.toMillis() : null,
  };
};

// Get all blog posts
export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push(serializeData(doc));
      });

      return blogs;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch blog posts");
    }
  }
);

// Get a single blog post
export const fetchBlogPost = createAsyncThunk(
  "blog/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return serializeData(docSnap);
      } else {
        return rejectWithValue("Blog post not found");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch blog post");
    }
  }
);

// Create a new blog post
export const createBlogPost = createAsyncThunk(
  "blog/create",
  async (blogData, { rejectWithValue }) => {
    try {
      const blogRef = collection(db, "blogs");
      const timestamp = new Date().getTime(); // Use serializable timestamp

      const newBlog = {
        ...blogData,
        createdAt: serverTimestamp(), // For Firestore
        updatedAt: serverTimestamp(), // For Firestore
        published: blogData.published || false,
      };

      const docRef = await addDoc(blogRef, newBlog);

      // Return serializable data to Redux
      return {
        id: docRef.id,
        ...blogData,
        createdAt: timestamp,
        updatedAt: timestamp,
        published: blogData.published || false,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create blog post");
    }
  }
);

// Update a blog post
export const updateBlogPost = createAsyncThunk(
  "blog/update",
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const blogRef = doc(db, "blogs", id);
      const timestamp = new Date().getTime(); // Use serializable timestamp

      const firestoreData = {
        ...blogData,
        updatedAt: serverTimestamp(), // For Firestore
      };

      await updateDoc(blogRef, firestoreData);

      // Return serializable data to Redux
      return {
        id,
        ...blogData,
        updatedAt: timestamp,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update blog post");
    }
  }
);

// Delete a blog post
export const deleteBlogPost = createAsyncThunk(
  "blog/delete",
  async (id, { rejectWithValue }) => {
    try {
      const blogRef = doc(db, "blogs", id);
      await deleteDoc(blogRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete blog post");
    }
  }
);

// Toggle publish status
export const togglePublishStatus = createAsyncThunk(
  "blog/togglePublish",
  async ({ id, published }, { rejectWithValue }) => {
    try {
      const blogRef = doc(db, "blogs", id);
      const timestamp = new Date().getTime(); // Use serializable timestamp

      await updateDoc(blogRef, {
        published,
        updatedAt: serverTimestamp(), // For Firestore
      });

      return {
        id,
        published,
        updatedAt: timestamp,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to update publish status"
      );
    }
  }
);

// Clone a blog post
export const cloneBlogPost = createAsyncThunk(
  "blog/clone",
  async (blogToClone, { rejectWithValue }) => {
    try {
      const blogRef = collection(db, "blogs");
      const timestamp = new Date().getTime();

      // Create a new blog with the same content but different title
      const newBlog = {
        ...blogToClone,
        title: `${blogToClone.title} (Copy)`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        published: false, // Set as draft by default
      };

      // Remove id to avoid overwriting the original
      delete newBlog.id;

      const docRef = await addDoc(blogRef, newBlog);

      // Return serializable data to Redux
      return {
        id: docRef.id,
        ...newBlog,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to clone blog post");
    }
  }
);

// Blog Slice
const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all blog posts
    builder.addCase(fetchBlogPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogPosts.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBlogPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch single blog post
    builder.addCase(fetchBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogPost.fulfilled, (state, action) => {
      state.currentBlog = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create blog post
    builder.addCase(createBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBlogPost.fulfilled, (state, action) => {
      state.blogs.unshift(action.payload);
      state.currentBlog = action.payload;
      state.loading = false;
    });
    builder.addCase(createBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update blog post
    builder.addCase(updateBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBlogPost.fulfilled, (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs[index] = {
          ...state.blogs[index],
          ...action.payload,
        };
      }
      state.currentBlog = {
        ...state.currentBlog,
        ...action.payload,
      };
      state.loading = false;
    });
    builder.addCase(updateBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete blog post
    builder.addCase(deleteBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBlogPost.fulfilled, (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      if (state.currentBlog && state.currentBlog.id === action.payload) {
        state.currentBlog = null;
      }
      state.loading = false;
    });
    builder.addCase(deleteBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Clone blog post
    builder.addCase(cloneBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(cloneBlogPost.fulfilled, (state, action) => {
      state.blogs.unshift(action.payload);
      state.loading = false;
    });
    builder.addCase(cloneBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Toggle publish status
    builder.addCase(togglePublishStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(togglePublishStatus.fulfilled, (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs[index].published = action.payload.published;
        state.blogs[index].updatedAt = action.payload.updatedAt;
      }
      if (state.currentBlog && state.currentBlog.id === action.payload.id) {
        state.currentBlog.published = action.payload.published;
        state.currentBlog.updatedAt = action.payload.updatedAt;
      }
      state.loading = false;
    });
    builder.addCase(togglePublishStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearCurrentBlog } = blogSlice.actions;

// Selectors
export const selectAllBlogs = (state) => state.blog.blogs;
export const selectCurrentBlog = (state) => state.blog.currentBlog;
export const selectBlogLoading = (state) => state.blog.loading;
export const selectBlogError = (state) => state.blog.error;

export default blogSlice.reducer;
