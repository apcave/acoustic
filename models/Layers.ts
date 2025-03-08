import mongoose, { Schema, model, models } from "mongoose";
import Material from "@/models/Material";

// Define the schema for the nested 'compression' object
const layerSchema = new Schema({
    thickness: {
    type: Number,
  },
  material: {
    type: Material,
    required: true,
  }
});

const layersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  layers: [layerSchema],
  userId: {
    type: mongoose.Types.ObjectId,
    required:true,
  }
},
{
    timestamps: true,
  }
);

const Layers = models.Layers || model("Material", layersSchema);

export default Layers;