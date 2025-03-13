import { iModel } from "@/lib/data-helpers";
import { Dispatch } from "redux";

export function saveModelToServer(model: iModel) {
  async function sendData(dispatch: Dispatch) {
    try {
      const response = await fetch("/api/model", {
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

      console.log("Data:", data);
    } catch (error) {
      console.log("Error saving model:", error);
    }
  }

  return sendData;
}
