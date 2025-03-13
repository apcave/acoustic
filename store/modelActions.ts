import { iModel } from "@/lib/data-helpers";
import { Dispatch } from "redux";
import { editModel } from "./modelSlice";

/*
  This thunk sends a model to the server to be saved.
  The server will return the model with the id assigned.
  This model is used to update the client state.

  TODO:
  - When the simulator is working the return model with include the results.
  - If the delay is too long, the client will need to poll the server for the results.
*/

export function saveModelToServer(model: iModel) {
  async function sendData(dispatch: Dispatch) {
    try {
      const response = await fetch("/api/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("<<<<<<<<<<<<<<<<<----------------------");
      console.log("client Model sent to server");
      const newModel: iModel = data.model;

      console.log("<<<<<<<<<<<<<<<<<----------------------");
      console.log("client updating Model state");
      dispatch(editModel(newModel));
    } catch (error) {
      console.log("Error saving model:", error);
    }
  }

  return sendData;
}
