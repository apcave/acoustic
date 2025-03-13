import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  iniModel,
  iModel,
  iSweep,
  iResult,
  iComposite,
  iLayer,
} from "@/lib/data-helpers";

/*
    Only the material properties and the models are saved individually.
    The layers, sweep and figures data are saved in the models.
*/
interface ModelState {
  model: iModel;
}

const initialState: ModelState = {
  model: iniModel(),
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<iModel>) => {
      state.model = action.payload;
    },

    setLayers: (state, action: PayloadAction<iComposite>) => {
      state.model.composite = action.payload;
    },

    setSweep: (state, action: PayloadAction<iSweep>) => {
      state.model.sweep = action.payload;
    },
    setResults: (state, action: PayloadAction<iResult>) => {
      state.model.result = action.payload;
    },
    deleteLayer: (state, action: PayloadAction<iLayer>) => {
      state.model.composite.layers = state.model.composite.layers.filter(
        (lay) => lay._id !== action.payload._id
      );
    },
    moveLayerUp: (state, action: PayloadAction<iLayer>) => {
      const idx = state.model.composite.layers.findIndex(
        (lay) => lay._id === action.payload._id
      );
      if (idx > 0) {
        // Swap the layers
        const temp = state.model.composite.layers[idx];
        if (idx === 1) {
          temp.thickness = 0;
        }
        state.model.composite.layers[idx] =
          state.model.composite.layers[idx - 1];
        state.model.composite.layers[idx - 1] = temp;
      }
    },
    moveLayerDown: (state, action: PayloadAction<iLayer>) => {
      const idx = state.model.composite.layers.findIndex(
        (lay) => lay._id === action.payload._id
      );
      if (idx < state.model.composite.layers.length - 1) {
        const temp = state.model.composite.layers[idx];
        if (idx === state.model.composite.layers.length - 2) {
          temp.thickness = 0;
        }
        state.model.composite.layers[idx] =
          state.model.composite.layers[idx + 1];
        state.model.composite.layers[idx + 1] = temp;
      }
    },
    editLayer: (state, action: PayloadAction<iLayer>) => {
      const idx = state.model.composite.layers.findIndex(
        (lay) => lay._id === action.payload._id
      );
      if (idx >= 0) {
        state.model.composite.layers[idx] = action.payload;
      }
    },
    addLayer: (state, action: PayloadAction<iLayer>) => {
      state.model.composite.layers.push(action.payload);
    },
    editName: (state, action: PayloadAction<string>) => {
      state.model.name = action.payload;
    },

    editDescription: (state, action: PayloadAction<string>) => {
      state.model.description = action.payload;
    },

    editSweep: (state, action: PayloadAction<iSweep>) => {
      state.model.sweep = action.payload;
    },
    setIncidentCompression: (state, action: PayloadAction<boolean>) => {
      state.model.incidentCompression = action.payload;
    },

    editModel: (state, action: PayloadAction<iModel>) => {
      //TODO: This is not working
      console.log("editModel", action.payload);
      state.model = action.payload;
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
  editName,
  editDescription,
  editSweep,
  editModel,
  setIncidentCompression,
} = modelSlice.actions;
export default modelSlice.reducer;
