import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  iMaterial,
  matSerializable,
  matsSerializable,
} from "../actions/material-helper";

interface MaterialState {
  materials: iMaterial[];
  editMaterial: iMaterial | null;
}

const initialState: MaterialState = {
  materials: [],
  editMaterial: null,
};

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    replaceMaterials: (state, action: PayloadAction<iMaterial[]>) => {
      state.materials = matsSerializable(action.payload);
    },
    setEditMaterial: (state, action: PayloadAction<iMaterial>) => {
      state.editMaterial = matSerializable(action.payload);
    },
  },
});

export const { replaceMaterials, setEditMaterial } = materialSlice.actions;
export default materialSlice.reducer;
