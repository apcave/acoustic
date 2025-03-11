import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  iMaterial,
  iniMaterial,
  matSerializable,
  matsSerializable,
} from "../actions/material-helper";

interface MaterialState {
  materials: iMaterial[];
  editMaterial: iMaterial | null;
}

const initialState: MaterialState = {
  materials: [],
  editMaterial: iniMaterial(),
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
    saveEditToMaterials: (state) => {
      if (state.editMaterial) {
        const idx = state.materials.findIndex(
          (mat) => mat._id === state.editMaterial?._id
        );
        if (idx >= 0) {
          state.materials[idx] = state.editMaterial;
        }
      }
    },
  },
});

export const { replaceMaterials, setEditMaterial, saveEditToMaterials } =
  materialSlice.actions;
export default materialSlice.reducer;
