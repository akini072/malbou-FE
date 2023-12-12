import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

export const createShared = createAsyncThunk('share/create', async (data, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await Axios.post('share/create', data);
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

const sharedSlice = createSlice({
  name: 'tags',
  initialState: {
    loading: false,
    errors: null,
    allSaved: [],
    shared: null,
    isShared: false
  },
  reducers: {
    resetShared: (state) => {
      state.loading = false;
      state.isShared = false;
      state.shared = false;
      state.errors = null;
    }
  },
  extraReducers: (builder) => {
    // create share
    builder.addCase(createShared.pending, (state) => {
      state.loading = true;
      state.isSaved = false;
    });
    builder.addCase(createShared.fulfilled, (state, action) => {
      state.loading = false;
      state.isSaved = true;
      state.saved = action.payload;
    });
    builder.addCase(createShared.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        created: action.payload
      };
    });
  }
});

export const { resetShared } = sharedSlice.actions;

export default sharedSlice.reducer;
