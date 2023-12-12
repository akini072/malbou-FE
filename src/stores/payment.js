import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

export const createPaymentIntent = createAsyncThunk(
  'payments/create-payment-intent',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post('payments/create-intent', data);
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

export const checkPayment = createAsyncThunk(
  'payments/check-payment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post('payments/check-payment', data);
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

export const cancelSubscription = createAsyncThunk(
  'payments/cancel-subscription',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post('payments/cancel', data);
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

export const createSessionPayment = createAsyncThunk(
  'payments/create-payment-session',
  async (data, { rejectWithValue }) => {
    try {
      if (data.token) {
        const response = await Axios.post('payments/session', data, {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });
        return response.data;
      } else {
        const response = await Axios.post('payments/session', data);
        return response.data;
      }
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

export const createPaymentLink = createAsyncThunk(
  'payments/create-payment-link',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post('payments/payment-link', data);
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

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentIntent: null,
    clientSecret: null,
    loading: false,
    isCreatedIntent: false,
    isCreatedSession: false,
    isPaymentLink: false,
    isCancelled: false,
    transaction: null,
    paymentLink: null,
    session: null,
    errors: null
  },
  reducers: {
    resetPayment: (state) => {
      state.loading = false;
      state.isCreatedSession = false;
      state.isCreatedIntent = false;
      state.isPaymentLink = false;
      state.isCancelled = false;
    }
  },
  extraReducers: (builder) => {
    // cancel subscription
    builder.addCase(cancelSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.isCancelled = action.payload;
    });
    builder.addCase(cancelSubscription.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        cancelSubscription: action.payload
      };
    });
    // check payment
    builder.addCase(checkPayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });
    builder.addCase(checkPayment.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        checkPayment: action.payload
      };
    });
    // create session
    builder.addCase(createSessionPayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSessionPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.session = action.payload;
      state.isCreatedSession = true;
    });
    builder.addCase(createSessionPayment.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        session: action.payload
      };
    });
    // create payment link
    builder.addCase(createPaymentLink.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPaymentLink.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentLink = action.payload;
      state.isPaymentLink = true;
    });
    builder.addCase(createPaymentLink.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        paymentLink: action.payload
      };
    });
    // create intent
    builder.addCase(createPaymentIntent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPaymentIntent.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentIntent = action.payload;
      state.clientSecret = action.payload.client_secret;
      state.isCreatedIntent = true;
    });
    builder.addCase(createPaymentIntent.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        createIntent: action.payload
      };
    });
  }
});

export const { resetPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
