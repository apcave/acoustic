import { iComposite, iniLayers } from "./layers-helper";
import { v4 as uuidv4 } from "uuid";

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
    _id: uuidv4(), // Replace with a valid ID or generate one
    name: "New Model",
    description: "A default acoustic model.",
    composite: iniLayers(), // Start with an empty array of layers
    sweep: iniSweep(),
    result: null,
    userId: "default_user_id", // Replace with a valid user ID
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
