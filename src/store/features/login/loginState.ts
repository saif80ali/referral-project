import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

export interface userLoginState {
    loginModal: boolean;
    userLoggedIn: boolean;
}

export const initialState: userLoginState = {
    loginModal: false,
    userLoggedIn: false,
};

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.loginModal = !state.loginModal;
    },
    setUserLoggedIn(state, action: PayloadAction<boolean>) {
        state.userLoggedIn = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleLoginModal, setUserLoggedIn } = userLoginSlice.actions

export default userLoginSlice.reducer