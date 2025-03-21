"use server";
import { connectDB } from "@/lib/mongodb";
import Material from "@/models/Material";
import Model from "@/models/Model";
import mongoose from "mongoose";

import { newID } from "@/lib/data-helpers";

const materialsData = [
  {
    category: "solid",
    name: "Aluminum, rolled",
    density: 2700,
    compression: {
      type: "wave",
      waveSpeed: 6420,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3040,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Brass (70 Cu, 30 Zn)",
    density: 8600,
    compression: {
      type: "wave",
      waveSpeed: 4700,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 2110,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Copper, annealed",
    density: 8930,
    compression: {
      type: "wave",
      waveSpeed: 4760,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 2325,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Copper, rolled",
    density: 8930,
    compression: {
      type: "wave",
      waveSpeed: 5010,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 2270,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Gold, hard-drawn",
    density: 19700,
    compression: {
      type: "wave",
      waveSpeed: 3240,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 1200,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Iron, Armco",
    density: 7850,
    compression: {
      type: "wave",
      waveSpeed: 5960,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3240,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Lead, annealed",
    density: 11400,
    compression: {
      type: "wave",
      waveSpeed: 2160,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 700,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Lead, rolled",
    density: 11400,
    compression: {
      type: "wave",
      waveSpeed: 1960,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 690,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Molybdenum",
    density: 10100,
    compression: {
      type: "wave",
      waveSpeed: 6250,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3350,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Monel metal",
    density: 8900,
    compression: {
      type: "wave",
      waveSpeed: 5350,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 2720,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Nickel (unmagnetized)",
    density: 8850,
    compression: {
      type: "wave",
      waveSpeed: 5480,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 2990,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Nickel",
    density: 8900,
    compression: {
      type: "wave",
      waveSpeed: 6040,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3000,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Platinum",
    density: 21400,
    compression: {
      type: "wave",
      waveSpeed: 3260,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 1730,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Silver",
    density: 10400,
    compression: {
      type: "wave",
      waveSpeed: 3650,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 1610,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Steel, mild",
    density: 7850,
    compression: {
      type: "wave",
      waveSpeed: 5960,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3235,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Steel, 347 Stainless",
    density: 7900,
    compression: {
      type: "wave",
      waveSpeed: 5790,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3100,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Tin, rolled",
    density: 7300,
    compression: {
      type: "wave",
      waveSpeed: 3320,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 1670,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Titanium",
    density: 4500,
    compression: {
      type: "wave",
      waveSpeed: 6070,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3125,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Tungsten, annealed",
    density: 19300,
    compression: {
      type: "wave",
      waveSpeed: 5220,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 2890,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Tungsten Carbide",
    density: 13800,
    compression: {
      type: "wave",
      waveSpeed: 6655,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3980,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Zinc, rolled",
    density: 7100,
    compression: {
      type: "wave",
      waveSpeed: 4210,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 2440,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Fused silica",
    density: 2200,
    compression: {
      type: "wave",
      waveSpeed: 5968,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3764,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Glass, Pyrex",
    density: 2320,
    compression: {
      type: "wave",
      waveSpeed: 5640,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 3280,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Glass, heavy silicate flint",
    density: 3880,
    compression: {
      type: "wave",
      waveSpeed: 3980,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 2380,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Lucite",
    density: 1180,
    compression: {
      type: "wave",
      waveSpeed: 2680,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 1100,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Nylon 6-6",
    density: 1110,
    compression: {
      type: "wave",
      waveSpeed: 2620,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 1070,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Polyethylene",
    density: 900,
    compression: {
      type: "wave",
      waveSpeed: 1950,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 540,
      attenuation: 0,
    },
  },
  {
    category: "solid",
    name: "Polystyrene",
    density: 1060,
    compression: {
      type: "wave",
      waveSpeed: 2350,
      attenuation: 0,
    },
    shear: {
      type: "wave",
      waveSpeed: 1120,
      attenuation: 0,
    },
  },
  {
    name: "Acetone",
    category: "liquid",
    density: 790,
    compression: {
      type: "wave",
      waveSpeed: 1174,
      attenuation: 0,
    },
    shear: {
      type: "fluid",
    },
  },
  {
    name: "Water (distilled)",
    category: "liquid",
    density: 998,
    compression: {
      type: "wave",
      waveSpeed: 1496.7,
      attenuation: 0,
    },
    shear: {
      type: "fluid",
    },
  },
  {
    name: "Air, dry",
    category: "gas",
    density: 1.293,
    compression: {
      type: "wave",
      waveSpeed: 331.45,
      attenuation: 0,
    },
    shear: {
      type: "fluid",
    },
  },
  {
    name: "Helium",
    category: "gas",
    density: 0.178,
    compression: {
      type: "wave",
      waveSpeed: 965,
      attenuation: 0,
    },
    shear: {
      type: "fluid",
    },
  },
  {
    name: "Hydrogen",
    category: "gas",
    density: 0.0899,
    compression: {
      type: "wave",
      waveSpeed: 1284,
      attenuation: 0,
    },
    shear: {
      type: "fluid",
    },
  },
];

let databaseInitialized = false;

export async function seedDatabase(userIdStr: string) {
  if (databaseInitialized) {
    return;
  }
  databaseInitialized = true;

  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const userId = new mongoose.Types.ObjectId(userIdStr);
    const materialsWithUserId = materialsData.map((material) => ({
      ...material,
      _id: newID(),
      userId: userId,
    }));

    // Optional: Clear existing data
    await Material.deleteMany({});
    await Model.deleteMany({});
    console.log("Cleared existing data");

    // Insert the new data
    await Material.insertMany(materialsWithUserId);
    console.log("Seeded database with new data");

    process.exit(0); // Exit the script
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with an error code
  }
}
