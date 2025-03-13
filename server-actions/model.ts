"use server";
import { connectDB } from "@/lib/mongodb";
import Model from "@/models/Model";
import {
  iniModelActionStatus,
  iModelActionStatus,
  iModel,
  newID,
} from "@/lib/data-helpers";

export async function getModel(modelId: string): Promise<iModelActionStatus> {
  const status = iniModelActionStatus();

  try {
    await connectDB();

    const model = await Model.findById(modelId);
    if (!model) {
      status.status = "error";
      status.errorMessages.push("Model not found");
      return status;
    }

    status.status = "success";
    status.payload = JSON.parse(JSON.stringify(model));
    return status;
  } catch (error: any) {
    status.status = "error";
    status.errorMessages.push("Failed to fetch materials", error.message);
    return status;
  }
}

/*
  There is extensive validation performed on the client side.
  TODO: Add server-side validation.
*/
export async function updateModel(
  newModel: iModel
): Promise<iModelActionStatus> {
  const status = iniModelActionStatus();

  try {
    await connectDB();

    if (newModel._id === "unsaved") {
      newModel._id = newID();
    }

    // Update existing material
    let model = await Model.findById(newModel._id);
    if (model) {
      // Assign the values from the makeMaterial function to the existing material
      model.name = newModel.name;
      model.description = newModel.description;
      model.incidentCompression = newModel.incidentCompression;
      model.composite = newModel.composite;
      model.sweep = newModel.sweep;
      model.result = newModel.result;
      model.updatedAt = new Date().toISOString();
    } else {
      console.log("Creating new model <<<<<<<<<<<-------------------");
      model = new Model(newModel);
    }

    await model.save();

    status.status = "success";
    status.payload = JSON.parse(JSON.stringify(model));
    return status;
  } catch (error: any) {
    status.status = "error";
    status.errorMessages.push("Failed to update model", error.message);
    return status;
  }
}
