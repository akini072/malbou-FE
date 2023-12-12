import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

export const getResponse = createAsyncThunk('ai/get-response', async (rejectWithValue) => {
  try {
    const response = await Axios.get('ai/response');
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

export const creatPoem = createAsyncThunk('ai/create-poem', async (prompt, { rejectWithValue }) => {
  try {
    const response = await Axios.post('ai/create-poem', { prompt });
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

export const creatRecommendation = createAsyncThunk(
  'ai/create-recommendation',
  async (prompt, { rejectWithValue }) => {
    try {
      const response = await Axios.post('ai/create-recommendation', { prompt });
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

export const createImages = createAsyncThunk(
  'ai/create-images',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post('ai/create-images', data);
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

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    images: null,
    poem: null,
    recommendation: null,
    loading: false,
    response: [],
    errors: null
  },
  reducers: {
    resetAi: (state) => {
      state.response = [];
      state.images = null;
      state.poem = null;
      state.recommendation = null;
    }
  },
  extraReducers: (builder) => {
    // get response
    builder.addCase(getResponse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getResponse.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(getResponse.rejected, (state, action) => {
      state.loading = false;
      state.response = [];
      state.errors = {
        response: action.payload
      };
    });
    // create poem
    builder.addCase(creatPoem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(creatPoem.fulfilled, (state, action) => {
      state.loading = false;
      state.poem = action.payload;
    });
    builder.addCase(creatPoem.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        poem: action.payload
      };
    });
    // create recommendation
    builder.addCase(creatRecommendation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(creatRecommendation.fulfilled, (state, action) => {
      state.loading = false;
      state.recommendation = action.payload;
    });
    builder.addCase(creatRecommendation.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        recommendation: action.payload
      };
    });
    // create images
    builder.addCase(createImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createImages.fulfilled, (state, action) => {
      state.loading = false;
      state.images = action.payload;
    });
    builder.addCase(createImages.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        images: action.payload
      };
    });
  }
});

export const { resetAi } = aiSlice.actions;

export default aiSlice.reducer;
