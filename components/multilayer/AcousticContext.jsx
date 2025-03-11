import { React, createContext, useReducer } from "react";

import { GET_DUMMY_MATERIALS } from "./dummyData.js";

export const AcousticContext = createContext({
  materials: [],
  addMaterial: () => {},
  removeMaterial: () => {},
  updateMaterial: () => {},
});

function acousticReducer(state, action) {
  switch (action.type) {
    case "ADD_MATERIAL":
      return {
        ...state,
        materials: [...state.materials, action.payload],
      };
    case "REMOVE_MATERIAL":
      return {
        ...state,
        materials: state.materials.filter(
          (material) => material._id !== action.payload
        ),
      };
    case "UPDATE_MATERIAL":
      return {
        ...state,
        materials: state.materials.map((material) => {
          if (material._id === action.payload._id) {
            return action.payload;
          }
          return material;
        }),
      };
    default:
      return state;
  }
}

export function AcousticContextProvider({ children }) {
  const [state, dispatch] = useReducer(acousticReducer, {
    materials: GET_DUMMY_MATERIALS(),
  });

  function addMaterial(material) {
    dispatch({ type: "ADD_MATERIAL", payload: material });
  }

  function removeMaterial(id) {
    dispatch({ type: "REMOVE_MATERIAL", payload: id });
  }

  function updateMaterial(material) {
    dispatch({ type: "UPDATE_MATERIAL", payload: material });
  }

  return (
    <AcousticContext.Provider
      value={{
        materials: state.materials,
        addMaterial,
        removeMaterial,
        updateMaterial,
      }}
    >
      {children}
    </AcousticContext.Provider>
  );
}
