import Axios from 'config/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const login = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const response = await Axios.post('login', user);
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

export const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
  try {
    const response = await Axios.post('register', user);
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

export const signUpFB = createAsyncThunk('grant/facebook', async (user, { rejectWithValue }) => {
  try {
    const response = await Axios.post('grant/facebook', user);
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

export const sendMailReset = createAsyncThunk(
  'auth/send-mail-reset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await Axios.post('password/send-mail', { email });
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

export const updateNewPassword = createAsyncThunk(
  'auth/update-new-password',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post('password/reset', data);
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

export const createAi = createAsyncThunk('auth/create-ai', async (data, { rejectWithValue }) => {
  try {
    const response = await Axios.post('create-ai', data);
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

const initialState = {
  loading: false,
  user: null,
  isLogin: false,
  isCreatedAi: false,
  isSentMail: false,
  isUpdatedPassword: false,
  token: null,
  errors: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.errors = null;
      state.isLogin = false;
      state.isCreatedAi = false;
      state.isSentMail = false;
      state.isUpdatedPassword = false;
    }
  },
  extraReducers: (builder) => {
    // send mail reset password
    builder.addCase(updateNewPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateNewPassword.fulfilled, (state) => {
      state.loading = false;
      state.isUpdatedPassword = true;
    });
    builder.addCase(updateNewPassword.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        updateNewPassword: action.payload
      };
    });
    // send mail reset password
    builder.addCase(sendMailReset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendMailReset.fulfilled, (state) => {
      state.loading = false;
      state.isSentMail = true;
    });
    builder.addCase(sendMailReset.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        sendMail: action.payload
      };
    });
    // login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        login: action.payload
      };
    });
    // register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.isRegister = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isRegister = action.payload ? true : false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        login: action.payload
      };
    });
    // sign up with FB
    builder.addCase(signUpFB.pending, (state) => {
      state.loading = true;
      state.isRegister = false;
    });
    builder.addCase(signUpFB.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isRegister = action.payload ? true : false;
    });
    builder.addCase(signUpFB.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        login: action.payload
      };
    });
    // create ai
    builder.addCase(createAi.pending, (state) => {
      state.loading = true;
      state.isCreatedAi = false;
    });
    builder.addCase(createAi.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreatedAi = action.payload ? true : false;
    });
    builder.addCase(createAi.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        createAi: action.payload
      };
    });
  }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
