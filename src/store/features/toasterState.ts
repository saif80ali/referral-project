import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

export interface toasterState {
  message: string;
  type: string;
  id: string;
}

export interface toasterServiceItems extends Array<toasterState>{}
export const initialState: toasterServiceItems = []


export const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    setToaster(state, action: PayloadAction<toasterServiceItems>) {
        state = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToaster } = toasterSlice.actions

export default toasterSlice.reducer