import { iMaterial } from "@/actions/material-helper";

export interface iLayer {
  _id: string;
  thickness: number | undefined;
  material: iMaterial;
}

export interface iComposite {
  _id: string;
  name: string;
  description: string;
  layers: iLayer[];
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export function iniLayers(): iLayers {
  return {
    _id: "default_layer_id", // Replace with a valid ID or generate one
    name: "New Layer Set",
    description: "A default set of acoustic layers.",
    layers: [], // Start with an empty array of layers
    userId: "default_user_id", // Replace with a valid user ID
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
