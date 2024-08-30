import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './features/loginState';
import ToasterReducer from './features/toasterState';

const store = configureStore({
  reducer: {
    userLogin: LoginReducer,
    toaster: ToasterReducer
  },
})
export default store;
export type RootState = ReturnType<typeof store.getState>;