import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { ToasterDataModel } from '../../models/toasterDataModel';



// export interface toasterServiceItems extends Array<ToasterDataModel>{}
export const initialState: ToasterDataModel = {
  type: undefined,
  message: ''
}


export const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    setToaster(state, action: PayloadAction<ToasterDataModel>) {
      return {
        ...state,      // Spread the existing state
        ...action.payload,  // Spread the new object from the payload to overwrite existing state values
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToaster } = toasterSlice.actions

export default toasterSlice.reducer