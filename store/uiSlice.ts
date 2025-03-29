import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  serverFeedback: string | null;
  serverState: iServerState;
  showEditMaterial: boolean;
}
type iServerState = "idle" | "pending" | "success" | "error";
const initialState: uiState = {
  showEditMaterial: false,
  serverFeedback: null,
  serverState: "idle",
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
    setServerState: (state, action: PayloadAction<iServerState>) => {
      state.serverState = action.payload;
      if (action.payload === "idle") {
        state.serverFeedback = null;
      }
      if (action.payload === "pending") {
        state.serverFeedback = null;
      }
    },
  },
});

export const { showEditMaterial, setServerFeedback, setServerState } =
  uiSlice.actions;
export default uiSlice.reducer;
