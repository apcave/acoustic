import mongoose, { Schema, model, models } from "mongoose";

// Define the schema for the nested 'compression' and 'shear' objects
const propertySchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['wave', 'modulus', 'fluid', 'vacuum'], // Add enum validation
  },
  waveSpeed: {
    type: Number,
  },
  attenuation: {
    type: Number,
  },
  real: {
    type: Number,
  },
  imag: {
    type: Number,
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
  compression: propertySchema, // Embed the 'compression' schema
  shear: propertySchema, // Embed the 'shear' schema
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