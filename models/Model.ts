import mongoose, { Schema, Document } from "mongoose";

import { iComposite, iSweep, iResult } from "@/lib/data-helpers";

export interface iModel extends Document {
  _id: string;
  name: string;
  description: string;
  incidentCompression: boolean;
  composite: iComposite;
  sweep: iSweep;
  result: iResult | null;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const ModelSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  incidentCompression: { type: Boolean, required: true },
  composite: { type: Object, required: true },
  sweep: { type: Object, required: true },
  userId: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Model ||
  mongoose.model<iModel>("Model", ModelSchema);
