import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

export const getMessageDetail = createAsyncThunk(
  'messages/detail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`ai/messages/${id}`);
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

const sharedSlice = createSlice({
  name: 'message',
  initialState: {
    loading: false,
    errors: null,
    message: null,
    isShared: false
  },
  reducers: {
    resetMessage: (state) => {
      state.loading = false;
      state.message = null;
      state.errors = null;
    }
  },
  extraReducers: (builder) => {
    // create share
    builder.addCase(getMessageDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMessageDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(getMessageDetail.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        message: action.payload
      };
    });
  }
});

export const { resetMessage } = sharedSlice.actions;

export default sharedSlice.reducer;
