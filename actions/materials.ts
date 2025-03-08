"use server";
import { connectDB } from "@/lib/mongodb";
import Material from "@/models/Material";
import { iMaterial, iProperty, iUpdateMaterial, initialUpdateMaterial } from "@/actions/material-helper";

import { revalidatePath } from 'next/cache';
import { form } from "framer-motion/client";


export async function getMaterials(): Promise<iMaterial[]> {
  try {
    await connectDB();
    const materials = await Material.find({}); // Fetch all materials
    return JSON.parse(JSON.stringify(materials)); // Return the materials
  } catch (error) {
    console.error("Error fetching materials:", error);
    return []; // Return an empty array in case of error
  }
};

export async function updateAddMaterial(prevState : FormData, formData : FormData) : Promise<iUpdateMaterial>  {

  console.log("Updating material - ", formData);

  const status = initialUpdateMaterial();

  try {
    await connectDB();

    const userId = formData.get('userId') as string; // Get the user ID from the form
    const materialId = formData.get('_id') as string; // Get the material ID from the form
    const name = formData.get('name') as string;
    const density = parseFloat(formData.get('density') as string);

    const compressionType = formData.get('compression') as string;
    const compressionWaveSpeed = parseFloat(formData.get('compression-wave-speed') as string);
    const compressionAttenuation = parseFloat(formData.get('compression-attenuation') as string);
    const compressionModulusReal = parseFloat(formData.get('compression-real') as string);
    const compressionModulusImag = parseFloat(formData.get('compression-imag') as string);

    const shearType = formData.get('shear') as string;
    const shearWaveSpeed = parseFloat(formData.get('shear-wave-speed') as string);
    const shearAttenuation = parseFloat(formData.get('shear-attenuation') as string);
    const shearModulusReal = parseFloat(formData.get('shear-real') as string);
    const shearModulusImag = parseFloat(formData.get('shear-imag') as string);


    /* 
      TODO: Add more validation for limiting ranges of values and managing the vaccum type.
    */
    if (!compressionType || !(compressionType === 'wave' || compressionType === 'modulus' || compressionType === 'vacuum')) {  
      status.status = "error";
      status.errorMessages.push("Compression type must be wave or modulus");
    }

    if (!shearType || !(shearType === 'wave' || shearType === 'modulus' || shearType === 'fluid' || shearType === 'vacuum')) {
      status.status = "error";
      status.errorMessages.push("Shear type must be wave or modulus");
    }

    if (compressionType === 'fluid') {
      status.status = "error";
      status.errorMessages.push("Compression type cannot be fluid");
    }

    let category = 'solid';
    if (compressionType === 'vacuum') {
      category = 'vacuum';
      shearType = 'vacuum';
    }

    if (shearType === 'fluid') {
      category = 'fluid';
    }

    if (compressionType === 'wave') {
      if (!compressionWaveSpeed || compressionWaveSpeed < 0 ) {
        status.status = "error";
        status.errorMessages.push("Compression wave speed must be greater than 0");
      }
    }

    if (compressionType === 'modulus') {
      if (!compressionModulusReal || compressionModulusReal < 0 ) {
        status.status = "error";
        status.errorMessages.push("Compression real modulus must be greater than 0");
      }
      if (compressionModulusImag && compressionModulusImag < 0 ) {
        status.status = "error";
        status.errorMessages.push("Compression imaginary modulus must be greater than 0");
      }
    }

    if (shearType === 'wave') {
      if (!shearWaveSpeed || shearWaveSpeed < 0 ) {
        status.status = "error";
        status.errorMessages.push("Shear wave speed must be greater than 0");
      }
    }

    if (shearType === 'modulus') {
      if (!shearModulusReal || shearModulusReal < 0 ) {
        status.status = "error";
        status.errorMessages.push("Shear real modulus must be greater than 0");
      }
      if (shearModulusImag && shearModulusImag < 0 ) {
        status.status = "error";
        status.errorMessages.push("Shear imaginary modulus must be greater than 0");
      }
    }

    if (!name ) {
      status.status = "error";
      status.errorMessages.push("Name is required");
    } 

    if (!density) {
      status.status = "error";
      status.errorMessages.push("Density is required");
    }

    if ( status.status === "error" ) {
      return status;
    }


    let material: iMaterial | null = null;



  function makeMaterial() : iMaterial {

      // Update the material properties

      let compression : iProperty | null = null;
      // Update compression based on type
      if (compressionType === 'wave') {
          compression = {
          type: compressionType,
          waveSpeed: compressionWaveSpeed,
          attenuation: compressionAttenuation === null ? 0 : compressionAttenuation, // Handle null attenuation
        };
      } else if (compressionType === 'modulus') {
        compression = {
          type: compressionType,
          real: compressionModulusReal,
          imag: compressionModulusImag === null ? 0 : compressionModulusImag, // Handle null imag
        };
      }

      let shear : iProperty | null = null;
      // Update shear based on type
      if (shearType === 'wave') {
        shear = {
          type: shearType,
          waveSpeed: shearWaveSpeed,
          attenuation: shearAttenuation === null ? 0 : shearAttenuation, // Handle null attenuation
        };
      } else if (shearType === 'modulus') {
        shear = {
          type: shearType,
          real: shearModulusReal,
          imag: shearModulusImag === null ? 0 : shearModulusImag, // Handle null imag
        };
      }

      if (category === 'vacuum') {
        compression = {
          type: category,
        };
        shear = {
          type: category,
        };
      } else if (category === 'fluid') {
        shear = {
          type: category,
        };
      }

      if (!compression) {
        throw new Error("Compression type is invalid");
      }

      if (!shear) {
        throw new Error("Shear type is invalid");
      }

      const materialOb: iMaterial = {
        userId,
        name,
        density,
        category,
        compression,
        shear,
        updatedAt: new Date(),
      };

      return materialOb;

    }


    if (materialId) {
      // Update existing material
      material = await Material.findById(materialId);
      if (!material) {
        status.status = "error";
        status.errorMessages.push("Material not found");
        return status;
      }

      // Assign the values from the makeMaterial function to the existing material
      const materialOb = makeMaterial();
      material.name = materialOb.name;
      material.density = materialOb.density;
      material.category = materialOb.category;
      material.compression = materialOb.compression;
      material.shear = materialOb.shear;

      await material.save();

    } else {
      // Create new material
      material = new Material(makeMaterial());
      await material.save();
    }

    revalidatePath('/acoustic/materials');
    return { status: "success", errorMessages: [] };

  } catch (error: any) {
    console.error("Error updating/adding material:", error);
    return {
      status: "error",
      errorMessages: [error.message || "Failed to update/add material"],
    };
  }
}