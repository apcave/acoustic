"use server";
import { connectDB } from "@/lib/mongodb";
import Material from "@/models/Material";
import {
  iCategory,
  iMaterial,
  iProperty,
  iMatActionStatus,
  iniMatActionStatus,
} from "@/lib/data-helpers";

import { revalidatePath } from "next/cache";

export async function getMaterials(): Promise<iMatActionStatus> {
  const status = iniMatActionStatus();

  try {
    await connectDB();

    const materials = await Material.find({});

    status.status = "success";
    status.payload = JSON.parse(JSON.stringify(materials));
    return status;
  } catch (error: any) {
    status.status = "error";
    status.errorMessages.push("Failed to fetch materials", error.message);
    return status;
  }
}

export async function updateAddMaterial(
  clientMaterial: iMaterial
): Promise<iMatActionStatus> {
  console.log("Updating material");

  const status = iniMatActionStatus();

  try {
    await connectDB();

    let material = await Material.findById(clientMaterial._id);
    if (material) {
      material.name = clientMaterial.name;
      material.density = clientMaterial.density;
      material.category = clientMaterial.category;
      material.compression = clientMaterial.compression;
      material.shear = clientMaterial.shear;
    } else {
      clientMaterial.createdAt = new Date().toISOString();
      clientMaterial.updatedAt = new Date().toISOString();
      material = new Material(clientMaterial);
    }

    await material.save();

    status.payload = JSON.parse(JSON.stringify([material]));

    revalidatePath("/acoustic/materials");
    status.status = "success";
    return status;
  } catch (error: unknown) {
    console.error("Error updating/adding material:", error);
    status.status = "error";
    status.errorMessages.push(
      (error as Error)?.message || "Failed to update/add material"
    );
    return status;
  }
}
