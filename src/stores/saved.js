import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

export const createSaved = createAsyncThunk('saved/create', async (data, { rejectWithValue }) => {
  try {
    const response = await Axios.post('saved/create', data);
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

export const getAllSaved = createAsyncThunk('saved/all', async (rejectWithValue) => {
  try {
    const response = await Axios.get('saved/all');
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

export const getSavedByPage = createAsyncThunk('saved/all', async (data, { rejectWithValue }) => {
  try {
    const response = await Axios.post('saved/get', data);
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

export const getSavedByFilter = createAsyncThunk(
  'saved/filter',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post('saved/filter', data);
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
  }
);

export const getSavedDetail = createAsyncThunk(
  'saved/detail',
  async (savedId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`share/${savedId}`);
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
  }
);

const savedSlice = createSlice({
  name: 'tags',
  initialState: {
    loading: false,
    errors: null,
    allSaved: [],
    saved: null,
    isSaved: false,
    tag: null
  },
  reducers: {
    resetSaved: (state) => {
      state.loading = false;
      state.isSaved = false;
      state.saved = false;
      state.errors = null;
    }
  },
  extraReducers: (builder) => {
    // create saved
    builder.addCase(createSaved.pending, (state) => {
      state.loading = true;
      state.isSaved = false;
    });
    builder.addCase(createSaved.fulfilled, (state, action) => {
      state.loading = false;
      state.isSaved = true;
      state.saved = action.payload;
    });
    builder.addCase(createSaved.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        created: action.payload
      };
    });
    // get all saved
    builder.addCase(getAllSaved.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllSaved.fulfilled, (state, action) => {
      state.loading = false;
      state.allSaved = action.payload;
    });
    builder.addCase(getAllSaved.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        all: action.payload
      };
    });
    // get saved detail
    builder.addCase(getSavedDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSavedDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.saved = action.payload;
    });
    builder.addCase(getSavedDetail.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        detail: action.payload
      };
    });
  }
});

export const { resetSaved } = savedSlice.actions;

export default savedSlice.reducer;
