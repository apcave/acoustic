import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  iMaterial,
  iniMaterial,
  matSerializable,
  matsSerializable,
} from "@/lib/data-helpers";

interface MaterialState {
  materials: iMaterial[];
  materialLocal: boolean;
  editMaterial: iMaterial;
}

const initialState: MaterialState = {
  materials: [],
  materialLocal: false,
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

    setEditGlobalMaterial: (state, action: PayloadAction<iMaterial>) => {
      state.editMaterial = matSerializable(action.payload);
      state.materialLocal = false;
    },
    saveEditToMaterials: (state) => {
      if (state.editMaterial) {
        const idx = state.materials.findIndex(
          (mat) => mat._id === state.editMaterial?._id
        );
        console.log("Index of material to update:", idx);
        if (idx >= 0) {
          console.log("Updating material in list.");
          state.materials[idx] = state.editMaterial;
        }
      }
    },
    makeNewMaterial: (state) => {
      state.editMaterial = iniMaterial();
    },
    materialEditLocalCopy: (state, action: PayloadAction<iMaterial>) => {
      state.editMaterial = matSerializable(action.payload); // This makes a deep copy.
      state.materialLocal = true;
    },
  },
});

export const {
  replaceMaterials,
  setEditMaterial,
  saveEditToMaterials,
  makeNewMaterial,
  materialEditLocalCopy,
  setEditGlobalMaterial,
} = materialSlice.actions;
export default materialSlice.reducer;
