import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

export const createTag = createAsyncThunk('tags/create', async (data, { rejectWithValue }) => {
  try {
    const response = await Axios.post('tags/create', data);
    return response.data;
  } catch (error) {
    console.log('>>> Error: ', error);
    if (!error.response) {
      throw error;
    }
    if (error.response.data) {
      toast.error(error.response.data.message);
    }
    return rejectWithValue(error.response.data);
  }
});

export const getTags = createAsyncThunk('tags/all-private', async (rejectWithValue) => {
  try {
    const response = await Axios.get('tags/all-private');
    return response.data;
  } catch (error) {
    console.log('>>> Error: ', error);
    if (!error.response) {
      throw error;
    }
    if (error.response.data) {
      toast.error(error.response.data.message);
    }
    return rejectWithValue(error.response.data);
  }
});

export const getAllTags = createAsyncThunk('tags/all', async (rejectWithValue) => {
  try {
    const response = await Axios.get('tags/all');
    return response.data;
  } catch (error) {
    console.log('>>> Error: ', error);
    if (!error.response) {
      throw error;
    }
    if (error.response.data) {
      toast.error(error.response.data.message);
    }
    return rejectWithValue(error.response.data);
  }
});

const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    loading: false,
    errors: null,
    tags: [],
    isCreated: false,
    tag: null
  },
  reducers: {
    resetTag: (state) => {
      state.loading = false;
      state.isCreated = false;
      state.errors = null;
    }
  },
  extraReducers: (builder) => {
    // create tag
    builder.addCase(createTag.pending, (state) => {
      state.loading = true;
      state.isCreated = false;
    });
    builder.addCase(createTag.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = true;
      state.tag = action.payload;
    });
    builder.addCase(createTag.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        created: action.payload
      };
    });
    // get all tag
    builder.addCase(getTags.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.loading = false;
      state.tags = action.payload;
    });
    builder.addCase(getTags.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        all: action.payload
      };
    });
  }
});

export const { resetTag } = tagSlice.actions;

export default tagSlice.reducer;
