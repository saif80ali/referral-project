import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './features/login/loginState';

const store = configureStore({
  reducer: {
    userLogin: LoginReducer,
  },
})
export default store;
export type RootState = ReturnType<typeof store.getState>;