import { v4 as uuidv4 } from "uuid";

export function newID(): string {
  return uuidv4().replace(/-/g, "");
}

export interface iSweep {
  isFrequency: boolean;
  isLogarithmic: boolean;
  values: number[];
}

export interface iResult {
  Rp_real: number[];
  Rp_imag: number[];
  Rs_real: number[];
  Rs_imag: number[];
  Tp_real: number[];
  Tp_imag: number[];
  Ts_real: number[];
  Ts_imag: number[];
}

export interface iModel {
  _id: string;
  name: string;
  description: string;
  composite: iComposite;
  sweep: iSweep;
  result: iResult | null;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export function iniSweep(): iSweep {
  return {
    isFrequency: true,
    isLogarithmic: true,
    values: [20, 20000],
  };
}

export function iniModel(): iModel {
  return {
    _id: newID(), // Replace with a valid ID or generate one
    name: "New Model",
    description: "A default acoustic model.",
    composite: iniComposite(), // Start with an empty array of layers
    sweep: iniSweep(),
    result: null,
    userId: "default_user_id", // Replace with a valid user ID
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export type iType = "wave" | "modulus" | "fluid" | "vacuum";
export type iCategory = "solid" | "fluid" | "vacuum";
export type iLabel = "compression" | "shear";

export function matsSerializable(mats: iMaterial[]) {
  const newMats = mats.map((mat) => {
    return matSerializable(mat);
  });
  return newMats;
}

export function matSerializable(mat: iMaterial): iMaterial {
  const newMat = { ...mat };
  if (mat.createdAt) newMat.createdAt = dateToString(mat.createdAt);
  if (mat.updatedAt) newMat.updatedAt = dateToString(mat.updatedAt);
  return newMat;
}

export function dateToString(value: string | number | Date): string {
  let res: string;
  if (typeof value === "string") {
    res = value;
  } else if (typeof value === "number") {
    res = new Date(value).toISOString();
  } else {
    res = value.toISOString();
  }
  return res;
}

export interface iProperty {
  type: iType; // "wave" or "modulus"
  waveSpeed?: number;
  attenuation?: number;
  real?: number;
  imag?: number;
}

export interface iMaterial {
  _id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  category: iCategory;
  name: string;
  density: number;
  compression: iProperty;
  shear: iProperty;
  userId: string;
  save?(): void;
}

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

export function iniMaterial(): iMaterial {
  return {
    _id: newID(), // Or generate a default ID if needed
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function iniLayer(material: iMaterial): iLayer {
  return {
    _id: newID(), // Or generate a default ID if needed
    thickness: 0, // Or a default thickness
    material: material,
  };
}

export function iniComposite(): iComposite {
  return {
    _id: newID(), // Replace with a valid ID or generate one
    name: "New Layer Set",
    description: "A default set of acoustic layers.",
    layers: [], // Start with an empty array of layers
    userId: "default_user_id", // Replace with a valid user ID
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
