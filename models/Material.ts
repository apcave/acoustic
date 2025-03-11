import mongoose, { Schema, Document } from "mongoose";

import { iProperty } from "@/lib/data-helpers";

export interface iMaterial extends Document {
  _id: string; // Define _id as a string
  userId: string;
  name: string;
  density: number;
  category: string;
  compression: iProperty;
  shear: iProperty;
  updatedAt: Date;
}

const MaterialSchema: Schema = new Schema({
  _id: { type: String, required: true }, // Define _id as a string
  userId: { type: String, required: true },
  name: { type: String, required: true },
  density: { type: Number, required: true },
  category: { type: String, required: true },
  compression: { type: Object, required: true },
  shear: { type: Object, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Material ||
  mongoose.model<iMaterial>("Material", MaterialSchema);
