import { configureStore } from '@reduxjs/toolkit';

import authStore from './auth';
import userStore from './user';
import aiStore from './ai';
import roomStore from './room';
import ticketStore from './ticket';
import paymentStore from './payment';
import tagStore from './tag';
import savedStore from './saved';
import messageStore from './message';
import facebookStore from './facebook';

export const store = configureStore({
  reducer: {
    authStore,
    userStore,
    aiStore,
    roomStore,
    ticketStore,
    paymentStore,
    tagStore,
    savedStore,
    messageStore,
    facebookStore
  }
});
