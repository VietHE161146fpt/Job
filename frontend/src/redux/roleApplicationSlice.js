import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for API calls
const API_URL = 'http://localhost:9999/api/roleApplication';

// Submit a role application
export const submitRoleApplication = createAsyncThunk(
  'roleApplication/submitRoleApplication',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/post`, formData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Fetch all role applications
export const fetchAllRoleApplications = createAsyncThunk(
  'roleApplication/fetchAllRoleApplications',
  async (keyword = '', { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get`, { params: { keyword } });
      return response.data.allRoleApplication;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Fetch a role application by ID
export const fetchRoleApplicationById = createAsyncThunk(
  'roleApplication/fetchRoleApplicationById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get/${id}`);
      return response.data.application;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Slice definition
const roleApplicationSlice = createSlice({
  name: 'roleApplication',
  initialState: {
    submitStatus: 'idle',
    fetchAllStatus: 'idle',
    fetchByIdStatus: 'idle',
    applications: [],
    selectedApplication: null,
    application: null,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      // Reset all status and error fields
      state.submitStatus = 'idle';
      state.fetchAllStatus = 'idle';
      state.fetchByIdStatus = 'idle';
      state.error = null;
    },
    clearApplicationData: (state) => {
      // Reset specific application data without affecting status
      state.application = null;
      state.selectedApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit a role application
      .addCase(submitRoleApplication.pending, (state) => {
        state.submitStatus = 'loading';
        state.error = null;
      })
      .addCase(submitRoleApplication.fulfilled, (state, action) => {
        state.submitStatus = 'succeeded';
        state.application = action.payload;
        state.error = null;
      })
      .addCase(submitRoleApplication.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.error = action.payload.message;
      })

      // Fetch all role applications
      .addCase(fetchAllRoleApplications.pending, (state) => {
        state.fetchAllStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAllRoleApplications.fulfilled, (state, action) => {
        state.fetchAllStatus = 'succeeded';
        state.applications = action.payload || []; // Ensure applications is an array
        state.error = null;
      })
      .addCase(fetchAllRoleApplications.rejected, (state, action) => {
        state.fetchAllStatus = 'failed';
        state.error = action.payload.message;
      })

      // Fetch a role application by ID
      .addCase(fetchRoleApplicationById.pending, (state) => {
        state.fetchByIdStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchRoleApplicationById.fulfilled, (state, action) => {
        state.fetchByIdStatus = 'succeeded';
        state.selectedApplication = action.payload || null;
        state.error = null;
      })
      .addCase(fetchRoleApplicationById.rejected, (state, action) => {
        state.fetchByIdStatus = 'failed';
        state.error = action.payload.message;
      });
  },
});

// Export the actions
export const { resetStatus, clearApplicationData } = roleApplicationSlice.actions;

export default roleApplicationSlice.reducer;
