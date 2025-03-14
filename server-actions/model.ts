"use server";
import { connectDB } from "@/lib/mongodb";
import Model from "@/models/Model";
import {
  iModel,
  iModelStatus,
  iModelAllStatus,
  iniModelAllStatus,
  iniModelStatus,
  newID,
} from "@/lib/data-helpers";

import { revalidatePath } from "next/cache";

export async function getAllModels(): Promise<iModelAllStatus> {
  const status = iniModelAllStatus();

  console.log("Put a filter on models by user id and models marked as public.");

  try {
    await connectDB();

    const materials = await Model.find({});

    status.status = "success";
    status.payload = JSON.parse(JSON.stringify(materials));
    return status;
  } catch (error) {
    status.status = "error";
    if (error instanceof Error) {
      status.errorMessages.push(error.message);
    } else {
      status.errorMessages.push("Failed to load models from database");
    }
    return status;
  }
}

export async function getModel(modelId: string): Promise<iModelStatus> {
  const status = iniModelStatus();

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
  } catch (error) {
    status.status = "error";
    if (error instanceof Error) {
      status.errorMessages.push(error.message);
    } else {
      status.errorMessages.push("Failed to load models from database");
    }
    return status;
  }
}

/*
  There is extensive validation performed on the client side.
  TODO: Add server-side validation.
*/
export async function updateModel(newModel: iModel): Promise<iModelStatus> {
  const status = iniModelStatus();

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
    revalidatePath("/acoustic/models");

    status.status = "success";
    status.payload = JSON.parse(JSON.stringify(model));
    return status;
  } catch (error: any) {
    status.status = "error";
    status.errorMessages.push("Failed to update model", error.message);
    return status;
  }
}
