import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './features/loginState';
import ToasterReducer from './features/toasterState';
import LoaderReducer from './features/loaderState';

const store = configureStore({
  reducer: {
    userLogin: LoginReducer,
    toaster: ToasterReducer,
    loader: LoaderReducer,
  },
})
export default store;
export type RootState = ReturnType<typeof store.getState>;