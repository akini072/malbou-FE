import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

function handleError(error, rejectWithValue) {
  if (!error.response) {
    throw error;
  }
  if (error.response.data) {
    toast.error(error.response.data.message);
  }
  return rejectWithValue(error.response.data);
}

export const getFacebookPages = createAsyncThunk(
  'facebook/page',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.get('facebook/page', {
        params: {
          limit: payload.limit,
          after: payload?.after,
          before: payload?.before
        }
      });
      localStorage.setItem('pages', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const getFacebookFeed = createAsyncThunk(
  'facebook/feed',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.get('facebook/feed', {
        params: {
          pageId: payload.pageId,
          perPage: payload.perPage,
          page: payload.page
        }
      });
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const postFacebookFeed = createAsyncThunk(
  'facebook/postFeed',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.post('facebook/feed', payload.data);
      payload?.callback();
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const publishFacebookFeed = createAsyncThunk(
  'facebook/publishPost',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`facebook/feed/${payload.feedId}/publishing`, payload.data);
      payload?.callback();
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const postImage = createAsyncThunk(
  'facebook/postImage',
  async (payload, { rejectWithValue }) => {
    try {
      var form = new FormData();
      form.append('file', payload.data.file);
      const response = await Axios.post('facebook/file', form);
      payload?.callback(response.data.url);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const putFacebookFeet = createAsyncThunk(
  'facebook/putFeed',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`facebook/feed/${payload.feedId}`, payload.data);
      await payload?.callback();
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const deleteFacebookFeet = createAsyncThunk(
  'facebook/deleteFeed',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(`facebook/feed/${payload.feedId}`, payload.data);
      await payload?.callback();
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const facebookRandom = createAsyncThunk(
  'facebook/random',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.get('facebook/feed/random');
      return response.data.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

const facebookSlice = createSlice({
  name: 'facebook',
  initialState: {
    pages: {
      data: [],
      paging: {}
    },
    feeds: {
      data: [],
      totalData: 0,
      page: 0,
      perPage: 10,
      nextPage: false
    },
    postsRandom: [],
    image: null,
    loadingImage: false,
    loading: false,
    errors: null
  },
  reducers: {
    selectedTicket: (state, action) => {
      state.ticket = action.payload;
    }
  },
  extraReducers: (builder) => {
    //get facebook random
    builder.addCase(facebookRandom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(facebookRandom.fulfilled, (state, action) => {
      state.loading = false;
      state.postsRandom = action.payload;
    });
    builder.addCase(facebookRandom.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        feed: action.payload
      };
    });

    // get facebook page
    builder.addCase(getFacebookPages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFacebookPages.fulfilled, (state, action) => {
      state.loading = false;
      state.pages = action.payload;
    });
    builder.addCase(getFacebookPages.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        pages: action.payload
      };
    });
    // get facebook feed
    builder.addCase(getFacebookFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFacebookFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.feeds = action.payload;
      state.pages = JSON.parse(localStorage.getItem('pages'));
    });
    builder.addCase(getFacebookFeed.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        feeds: action.payload
      };
    });

    // post facebook feed
    builder.addCase(postFacebookFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postFacebookFeed.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postFacebookFeed.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        feeds: action.payload
      };
    });

    // put facebook feed
    builder.addCase(putFacebookFeet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(putFacebookFeet.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(putFacebookFeet.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        feeds: action.payload
      };
    });
    // delete facebook feed
    builder.addCase(deleteFacebookFeet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFacebookFeet.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteFacebookFeet.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        feeds: action.payload
      };
    });
    // publish facebook feed
    builder.addCase(publishFacebookFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(publishFacebookFeed.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(publishFacebookFeed.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        feeds: action.payload
      };
    });

    // post image
    builder.addCase(postImage.pending, (state) => {
      state.loadingImage = true;
    });
    builder.addCase(postImage.fulfilled, (state, action) => {
      state.loadingImage = false;
      state.image = action.payload;
    });
    builder.addCase(postImage.rejected, (state, action) => {
      state.loadingImage = false;
      state.errors = {
        image: action.payload
      };
    });
  }
});

export const { selectedFacebook } = facebookSlice.actions;

export default facebookSlice.reducer;
