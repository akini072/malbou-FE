import Axios from 'config/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const getUserWithAiname = createAsyncThunk(
  'users/detail',
  async (ainame, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`users/${ainame}`);
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

export const followUser = createAsyncThunk('users/follow', async (userId, { rejectWithValue }) => {
  try {
    const response = await Axios.post(`users/follower`, { userId });
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

export const getProfile = createAsyncThunk('users/profile', async (rejectWithValue) => {
  try {
    const response = await Axios.get(`profile`);
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

export const updateProfile = createAsyncThunk(
  'users/update-profile',
  async (user, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`profile`, user);
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

export const updatePassword = createAsyncThunk(
  'users/update-password',
  async (user, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`profile/password`, user);
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

export const sendVerifyAccount = createAsyncThunk('users/send-verify', async (rejectWithValue) => {
  try {
    const response = await Axios.get(`verify/re-send`);
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
  user: null,
  userDetail: null,
  loading: false,
  isUpdatedProfile: false,
  isUpdatedPassword: false,
  isReSent: false,
  isFollowed: false,
  errors: null
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    resetUser: (state) => {
      state.isUpdatedPassword = false;
      state.isReSent = false;
      state.isUpdatedProfile = false;
      state.isFollowed = false;
      state.errors = null;
    }
  },
  extraReducers: (builder) => {
    // get user detail
    builder.addCase(getUserWithAiname.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserWithAiname.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
    });
    builder.addCase(getUserWithAiname.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        detail: action.payload
      };
    });
    // follow user
    builder.addCase(followUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isFollowed = action.payload ? true : false;
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        follow: action.payload
      };
    });
    // get profile
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        profile: action.payload
      };
    });
    // update profile
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isUpdatedProfile = true;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.isUpdatedProfile = false;
      state.errors = {
        updateProfile: action.payload
      };
    });
    // update password
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.loading = false;
      state.isUpdatedPassword = true;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.isUpdatedPassword = false;
      state.errors = {
        updatePassword: action.payload
      };
    });
    // send email verify
    builder.addCase(sendVerifyAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendVerifyAccount.fulfilled, (state) => {
      state.loading = false;
      state.isReSent = true;
    });
    builder.addCase(sendVerifyAccount.rejected, (state, action) => {
      state.loading = false;
      state.isReSent = false;
      state.errors = {
        sendVerifyAccount: action.payload
      };
    });
  }
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
