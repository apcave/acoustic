import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  serverFeedback: string | null;
  showEditMaterial: boolean;
}

const initialState: uiState = {
  showEditMaterial: false,
  serverFeedback: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showEditMaterial: (state, action: PayloadAction<boolean>) => {
      state.showEditMaterial = action.payload;
    },
    setServerFeedback: (state, action: PayloadAction<string>) => {
      state.serverFeedback = action.payload;
    },
  },
});

export const { showEditMaterial, setServerFeedback } = uiSlice.actions;
export default uiSlice.reducer;
