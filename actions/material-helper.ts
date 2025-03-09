export type iType = "wave" | "modulus" | "fluid" | "vacuum";
export type iCategory = "solid" | "fluid" | "vacuum";
export type iLabel = "compression" | "shear";

export interface iProperty {
  type: iType; // "wave" or "modulus"
  waveSpeed?: number;
  attenuation?: number;
  real?: number;
  imag?: number;
}

export interface iMaterial {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  category: iCategory;
  name: string;
  density: number;
  compression: iProperty;
  shear: iProperty;
  userId: string;
  save?(): void;
}

export interface iMatActionStatus {
  status: string;
  payload: iMaterial[];
  errorMessages: string[];
}

export function iniMatActionStatus(): iMatActionStatus {
  return {
    status: "idle",
    payload: [],
    errorMessages: [],
  };
}

export function initialMaterial(): iMaterial {
  return {
    _id: "", // Or generate a default ID if needed
    category: "solid", // Or a default category
    name: "New Material",
    density: 1, // Or a default density
    compression: {
      type: "wave",
      waveSpeed: 0,
      attenuation: 0,
      real: undefined,
      imag: undefined,
    },
    shear: {
      type: "wave",
      waveSpeed: 0,
      attenuation: 0,
      real: undefined,
      imag: undefined,
    },
    userId: "", // Or a default user ID
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
