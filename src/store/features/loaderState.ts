import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoaderProps {
    loaderState: boolean;
}

export const initialState: LoaderProps = {
    loaderState: false,
};

export const loaderSlice = createSlice({
    name: "Loader",
    initialState,
    reducers: {
        setLoader(state, action: PayloadAction<boolean>) {
            state.loaderState = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const { setLoader } = loaderSlice.actions

export default loaderSlice.reducer