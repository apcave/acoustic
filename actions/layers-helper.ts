import { iMaterial } from "@/actions/material-helper";

export interface iLayer {
    thickness: number | undefined;
    material: iMaterial;
}

export interface iLayers {
  _id: string;
  name: string;
  description: string;
  layers: iLayer[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export function initialLayers(): iLayers {
    return {
    _id: "default_layer_id", // Replace with a valid ID or generate one
    name: "New Layer Set",
    description: "A default set of acoustic layers.",
    layers: [], // Start with an empty array of layers
    userId: "default_user_id", // Replace with a valid user ID
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
