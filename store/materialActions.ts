import {
  replaceMaterials,
  saveEditToMaterials,
  setEditMaterial,
} from "@/store/materialSlice";
import { setServerFeedback, setServerState } from "@/store/uiSlice";
import { iMaterial } from "@/lib/data-helpers";

import { Dispatch } from "redux";

export function fetchMaterialsList() {
  async function fetchData() {
    const response = await fetch("/api/materials");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.ok) {
      throw new Error("Could not fetch cart data!");
    }

    const data = await response.json();

    return data;
  }

  async function returnObject(dispatch: Dispatch) {
    try {
      const materials = await fetchData();

      dispatch(replaceMaterials(materials));
    } catch (error) {
      console.log("Error fetching materials:", error);
      // dispatch(
      //   uiActions.showNotification({
      //     status: 'error',
      //     title: 'Error!',
      //     message: 'Fetching cart data failed!',
      // })
    }
  }
  return returnObject;
}

export function updateMaterial(
  material: iMaterial
): (dispatch: Dispatch) => Promise<void> {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setServerState("pending"));
      console.log("Sending material to server:", material);

      const response = await fetch("/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(material),
      });

      const data = await response.json();
      console.log("Server response data:", data);

      if (!response.ok || data.status === "error") {
        const errorMessage = data.message || "Unknown error occurred";
        dispatch(setServerState("error"));
        dispatch(setServerFeedback(errorMessage));
        console.log("Error saving material:", errorMessage);
        return;
      }

      const newMaterial: iMaterial = data.material;
      dispatch(setEditMaterial(newMaterial));
      dispatch(saveEditToMaterials());
      dispatch(setServerState("success"));
      console.log("Material saved successfully:", newMaterial);
    } catch (error) {
      console.error("Error saving material:", error);
      dispatch(setServerState("error"));
      dispatch(
        setServerFeedback(
          "An unexpected error occurred while saving the material."
        )
      );
    }
  };
}
