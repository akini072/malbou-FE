import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

export const getVerifyTickets = createAsyncThunk('tickets/verify', async (rejectWithValue) => {
  try {
    const response = await Axios.get('tickets/plans/verify');
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

export const getAccountTickets = createAsyncThunk('tickets/account', async (rejectWithValue) => {
  try {
    const response = await Axios.get('tickets/plans/account');
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

export const getTickets = createAsyncThunk('tickets', async (rejectWithValue) => {
  try {
    const response = await Axios.get('tickets');
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

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: {
      purchase: [],
      subscription: []
    },
    verifyPlans: [],
    accountPlans: [],
    ticket: null,
    loading: false,
    errors: null
  },
  reducers: {
    selectedTicket: (state, action) => {
      state.ticket = action.payload;
    }
  },
  extraReducers: (builder) => {
    // get verify plans
    builder.addCase(getVerifyTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVerifyTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.verifyPlans = action.payload;
    });
    builder.addCase(getVerifyTickets.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        verify: action.payload
      };
    });
    // get account plans
    builder.addCase(getAccountTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccountTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.accountPlans = action.payload;
    });
    builder.addCase(getAccountTickets.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        account: action.payload
      };
    });
    // get service plans
    builder.addCase(getTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    });
    builder.addCase(getTickets.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        tickets: action.payload
      };
    });
  }
});

export const { selectedTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
