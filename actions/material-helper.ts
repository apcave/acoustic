
export interface iProperty {
  type: string; // "wave" or "modulus"
  waveSpeed?: number;
  attenuation?: number;
  real?: number;
  imag?: number;
}

export interface iMaterial {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
  category: string;
  name: string;
  density: number;
  compression: iProperty;
  shear: iProperty;
  userId: string;
}

export function initialUpdateMaterial() : iUpdateMaterial {
  return {
    status: "idle",
    errorMessages: [],
  };
}

export interface iUpdateMaterial {
  status: string;
  errorMessages: string[];
}


export function initialMaterial(): iMaterial {

  return {
    _id: '', // Or generate a default ID if needed
    category: 'solid', // Or a default category
    name: 'New Material',
    density: 1, // Or a default density
    compression: {
        type: 'wave',
        waveSpeed: 0,
        attenuation: 0,
        real: undefined,
        imag: undefined
    },
    shear: {
        type: 'wave',
        waveSpeed: 0,
        attenuation: 0,
        real: undefined,
        imag: undefined
    },
    userId: '', // Or a default user ID
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}