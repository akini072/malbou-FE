import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'config/axios';
import { toast } from 'react-toastify';

export const createRoom = createAsyncThunk('ai/rooms/create', async (type, { rejectWithValue }) => {
  console.log(type, '=-=-=-=-');
  try {
    const response = await Axios.post('ai/rooms/create', { type });
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

export const getRoomsGeneral = createAsyncThunk('ai/rooms/general', async (rejectWithValue) => {
  try {
    const response = await Axios.get('ai/rooms/general');
    console.log('0');
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

export const getRooms = createAsyncThunk('ai/rooms', async (rejectWithValue) => {
  try {
    const response = await Axios.get('ai/rooms');
    console.log('1');
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

export const getMessageOfRoom = createAsyncThunk(
  'ai/rooms/messages',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `ai/rooms/${data.roomId}?page=${data.pagination.page}&limit=${data.pagination.limit}&type=${data.type}`
      );
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

export const createMessage = createAsyncThunk(
  'ai/rooms/create-message',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`ai/create-message`, data);
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

export const getMessage = createAsyncThunk(
  'ai/rooms/get-message',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`ai/get-message`, data);
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

export const updateTitleOfRoom = createAsyncThunk(
  'ai/rooms/update-title',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`ai/rooms/${data.roomId}`, { title: data.title });
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

export const deleteRoom = createAsyncThunk(
  'ai/rooms/delete',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(`ai/rooms/${roomId}`);
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

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    loading: false,
    sending: false,
    rooms: [],
    roomsGeneral: [],
    messages: [],
    roomId: null,
    newRoom: null,
    newMessage: null,
    room: null,
    isSent: false,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
    disabledScroll: false,
    errors: null
  },
  reducers: {
    resetRoom: (state) => {
      //  state.rooms = [];
      state.messages = [];
      state.isSent = false;
      state.initLoading = false;
      state.sending = false;
      state.isCreated = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.errors = null;
      state.newRoom = null;
      state.newMessage = null;
      state.disabledScroll = false;
      state.room = null;
    },
    addQuestionToResponses: (state, action) => {
      state.messages = action.payload;
    },
    disabledScrollBottom: (state) => {
      state.disabledScroll = true;
    }
  },
  extraReducers: (builder) => {
    // create new room
    builder.addCase(createRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.newRoom = action.payload;
      state.isCreated = action.payload ? true : false;
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.loading = false;
      state.newRoom = [];
      state.errors = {
        newRoom: action.payload
      };
    });
    // get rooms general
    builder.addCase(getRoomsGeneral.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoomsGeneral.fulfilled, (state, action) => {
      state.loading = false;
      state.roomsGeneral = action.payload;
    });
    builder.addCase(getRoomsGeneral.rejected, (state, action) => {
      state.loading = false;
      state.roomsGeneral = [];
      state.errors = {
        roomsGeneral: action.payload
      };
    });
    // get rooms
    builder.addCase(getRooms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
    });
    builder.addCase(getRooms.rejected, (state, action) => {
      state.loading = false;
      state.rooms = [];
      state.errors = {
        rooms: action.payload
      };
    });
    // get messages
    builder.addCase(getMessageOfRoom.pending, (state) => {
      state.loading = true;
      state.initLoading = true;
      state.isSent = false;
    });
    builder.addCase(getMessageOfRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.initLoading = false;
      state.messages = action.payload.messages;
      state.room = action.payload.room;
    });
    builder.addCase(getMessageOfRoom.rejected, (state, action) => {
      state.loading = false;
      state.initLoading = false;
      state.messages = [];
      state.errors = {
        messages: action.payload
      };
    });
    // create message
    builder.addCase(createMessage.pending, (state) => {
      state.loading = true;
      state.sending = true;
      state.isSent = false;
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.sending = false;
      state.isSent = action.payload ? true : false;
      state.room = action.payload.room;
      state.newMessage = action.payload.message;
    });
    builder.addCase(createMessage.rejected, (state, action) => {
      state.loading = false;
      state.sending = false;
      state.isSent = false;
      state.errors = {
        createMessage: action.payload
      };
    });
    // get message by id
    builder.addCase(getMessage.pending, (state) => {
      state.loading = true;
      state.sending = true;
      state.isSent = false;
    });
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.sending = false;
      state.isSent = action.payload ? true : false;
      state.newMessage = action.payload.message;
    });
    builder.addCase(getMessage.rejected, (state, action) => {
      state.loading = false;
      state.sending = false;
      state.isSent = false;
      state.errors = {
        getMessage: action.payload
      };
    });
    // update title
    builder.addCase(updateTitleOfRoom.pending, (state) => {
      state.loading = true;
      state.isUpdated = false;
    });
    builder.addCase(updateTitleOfRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload ? true : false;
    });
    builder.addCase(updateTitleOfRoom.rejected, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.errors = {
        updateTitle: action.payload
      };
    });
    // delete room
    builder.addCase(deleteRoom.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
    });
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload ? true : false;
    });
    builder.addCase(deleteRoom.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.errors = {
        deleteRoom: action.payload
      };
    });
  }
});

export const { resetRoom, addQuestionToResponses, disabledScrollBottom } = roomSlice.actions;

export default roomSlice.reducer;
