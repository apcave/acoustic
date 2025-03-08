"use server";
import { connectDB } from "@/lib/mongodb";
import Layers from "@/models/Layers";
import { iLayers } from "@/actions/layers-helper";


export async function getLayer(layerId : string): Promise<iLayers | null> {
  try {
    await connectDB();
    const materials = await Layers.findById(layerId); // Fetch all materials
    return JSON.parse(JSON.stringify(materials)); // Return the materials
  } catch (error) {
    console.error("Error fetching materials:", error);
    return null; // Return an empty array in case of error
  }
};

export async function getLayersByUserId(userId: string): Promise<iLayers[]> {
    try {
      await connectDB();
      const layers = await Layers.find({ userId: userId }); // Find layers by userId
      return JSON.parse(JSON.stringify(layers));
    } catch (error) {
      console.error("Error fetching layers by userId:", error);
      return []; // Return an empty array in case of error
    }
  }