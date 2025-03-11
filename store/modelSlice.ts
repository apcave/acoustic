import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iniModel, iModel, iSweep, iResult } from "@/actions/model-helper";
import { iComposite, iLayer } from "@/actions/layers-helper";
/*
    Only the material properties and the models are saved individually.
    The layers, sweep and figures data are saved in the models.
*/

const initialState: iModel = iniModel();

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<iModel>) => {
      state = action.payload;
    },

    setLayers: (state, action: PayloadAction<iComposite>) => {
      state.composite = action.payload;
    },

    setSweep: (state, action: PayloadAction<iSweep>) => {
      state.sweep = action.payload;
    },
    setResults: (state, action: PayloadAction<iResult>) => {
      state.result = action.payload;
    },
    deleteLayer: (state, action: PayloadAction<iLayer>) => {
      state.composite.layers = state.composite.layers.filter(
        (lay) => lay._id !== action.payload._id
      );
    },
    moveLayerUp: (state, action: PayloadAction<iLayer>) => {
      const idx = state.composite.layers.findIndex(
        (lay) => lay._id === action.payload._id
      );
      if (idx > 0) {
        // Swap the layers
        const temp = state.composite.layers[idx];
        state.composite.layers[idx] = state.composite.layers[idx - 1];
        state.composite.layers[idx - 1] = temp;
      }
    },
    moveLayerDown: (state, action: PayloadAction<iLayer>) => {
      const idx = state.composite.layers.findIndex(
        (lay) => lay._id === action.payload._id
      );
      if (idx < state.composite.layers.length - 1) {
        const temp = state.composite.layers[idx];
        state.composite.layers[idx] = state.composite.layers[idx + 1];
        state.composite.layers[idx + 1] = temp;
      }
    },
    editLayer: (state, action: PayloadAction<iLayer>) => {
      const idx = state.composite.layers.findIndex(
        (lay) => lay._id === action.payload._id
      );
      if (idx >= 0) {
        state.composite.layers[idx] = action.payload;
      }
    },
    addLayer: (state, action: PayloadAction<iLayer>) => {
      state.composite.layers.push(action.payload);
    },
  },
});

export const {
  setModel,
  setLayers,
  setSweep,
  setResults,
  deleteLayer,
  moveLayerUp,
  moveLayerDown,
  editLayer,
  addLayer,
} = modelSlice.actions;
export default modelSlice.reducer;
