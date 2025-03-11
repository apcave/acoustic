import { replaceMaterials } from "@/store/materialSlice";

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
