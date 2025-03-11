import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  showEditMaterial: boolean;
}

const initialState: uiState = {
  showEditMaterial: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showEditMaterial: (state, action: PayloadAction<boolean>) => {
      state.showEditMaterial = action.payload;
    },
  },
});

export const { showEditMaterial } = uiSlice.actions;
export default uiSlice.reducer;
