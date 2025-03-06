import mongoose, { Schema, model, models, ObjectId } from "mongoose";

// Define the schema for the nested 'compression' object
const compressionSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  waveSpeed: {
    type: Number,
    required: true,
  },
  attenuation: {
    type: Number,
    default: 0,
  },
});

// Define the schema for the nested 'shear' object
const shearSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  waveSpeed: {
    type: Number,
  },
  attenuation: {
    type: Number,
    default: 0,
  },
});

// Define the main schema for the 'Material' document
const materialSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  density: {
    type: Number,
    required: true,
  },
  compression: compressionSchema, // Embed the 'compression' schema
  shear: shearSchema, // Embed the 'shear' schema
  userId: {
    type: mongoose.Types.ObjectId,
    required:true,
  }
},
{
    timestamps: true,
  }
);

const Material = models.Material || model("Material", materialSchema);

export default Material;