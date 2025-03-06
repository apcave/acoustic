import React from 'react';

import { useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '../Button.jsx';

let initialMaterial = {
    name: 'Vacuum',
    density: 0,
    compression: {
        type: 'wave',
        waveSpeed: 0,
        attenuation: 0,
    },
    shear: {
        type: 'wave',
        waveSpeed: 0,
        attenuation: 0,
    },
};

export default function ModalMaterial({value, ref }) {
    const dialog = useRef();

    if (value !== null) {
        initialMaterial = value;
    }
    const [material, setMaterial] = useState(initialMaterial);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  console.log(material);

  function handleCompType( newType ) {
    console.log(newType);
    setMaterial((prev) => {
      return {
        ...prev,
        compression: {
        type: newType,
        waveSpeed: 0,
        attenuation: 0,
      }}});
  }

  let compLabel = 'Compression Wave Data';
  if (material.compression.type === 'modulus') {
    compLabel = 'Compression Modulus (K) Data';
  }

  let shearLabel = 'Shear Wave Data';
  if (material.shear.type === 'modulus') {
    shearLabel = 'Shear Modulus (σ) Data';
  }


  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
    <h1 className="text-2xl font-bold mb-4">Material Properties</h1>
    <div className="flex items-center mb-4">
        <label className="block font-bold mr-4">Name</label>
        <input type="text" className="border rounded-md p-2 mr-4" value={material.name} />
        <label className="block font-bold mr-4">Density</label>
        <input type="number" className="border rounded-md p-2 w-[40mm]" value={material.density} />
    </div>

    <div className="align-center border rounded-md pt-1 pb-4 px-4 w-[200mm] h-[50mm]">
        <label className="block text-lg mb-2 font-bold">{compLabel}</label>
        <div className="flex items-center">
        <label className="block text-lg mb-2 font-bold mr-4 p-2 w-[40mm]">Data Type</label>
        <select id="material-select"
            value={material.compression.type}
            onChange={(e) => handleCompType( e.target.value )}
            className="border rounded-md mb-2">
            <option value="wave">Wave</option>
            <option value="modulus">Modulus (K)</option>
            <option value="vacuum">Vacuum</option>
        </select>
        </div>
        {material.compression.type === 'wave' && (
            <div className="flex items-center">
                <label className="block text-lg font-bold mr-4 p-2 w-[40mm]">Wave Speed</label>
                <input type="number" className="border rounded-md p-2 mr-4 w-[40mm]" value={material.compression.waveSpeed} />
                <label className="block text-lg font-bold w-[40mm]">Attenuation</label>
                <input type="number" className="border rounded-md p-2 w-[40mm]" value={material.compression.attenuation} />
            </div>)}
        {material.compression.type === 'modulus' && (
            <div className="flex items-center">
                <label className="block text-lg font-bold mr-4 p-2 w-[40mm]">Real (Pa)</label>
                <input type="number" className="border rounded-md p-2 mr-4 w-[40mm]" value={material.compression.real} />
                <label className="block text-lg font-bold mr-4 p-2 w-[40mm]">Imaginary (Pa)</label>
                <input type="number" className="border rounded-md p-2 w-[40mm]" value={material.compression.imag} />
            </div>)}
        {material.compression.type === 'vacuum' && (
            <>
                <p>Vacuums do not support compression or shear waves.</p>
                <p>They are pure reflective layers that shift phase 180°.</p>
                </>
            )}
    </div>
    <div className="align-center border rounded-md pt-1 pb-4 px-4 mt-4 w-[200mm] h-[50mm]">
        <label className="block text-lg mb-2 font-bold">{shearLabel}</label>
        <div className="flex items-center">
        <label className="block text-lg mb-2 font-bold mr-4 p-2 w-[40mm]">Data Type</label>
        <select id="material-select"
            value={material.compression.type}
            onChange={(e) => handleCompType( e.target.value )}
            className="border rounded-md mb-2">
            <option value="wave">Wave</option>
            <option value="modulus">Modulus (σ)</option>
            <option value="vacuum">Fluid</option>
        </select>
        </div>
        {material.compression.type === 'wave' && (
            <div className="flex items-center">
                <label className="block text-lg font-bold mr-4 p-2 w-[40mm]">Wave Speed</label>
                <input type="number" className="border rounded-md p-2 mr-4 w-[40mm]" value={material.shear.waveSpeed} />
                <label className="block text-lg font-bold w-[40mm]">Attenuation</label>
                <input type="number" className="border rounded-md p-2 w-[40mm]" value={material.shear.attenuation} />
            </div>)}
        {material.compression.type === 'modulus' && (
            <div className="flex items-center">
                <label className="block text-lg font-bold mr-4 p-2 w-[40mm]">Real (Pa)</label>
                <input type="number" className="border rounded-md p-2 mr-4 w-[40mm]" value={material.shear.real} />
                <label className="block text-lg font-bold mr-4 p-2 w-[40mm]">Imaginary (Pa)</label>
                <input type="number" className="border rounded-md p-2 w-[40mm]" value={material.shear.imag} />
            </div>)}
        {material.compression.type === 'vacuum' && (
            <>
                <p>Vacuums do not support compression or shear waves.</p>
                <p>They are pure reflective layers that shift phase 180°.</p>
                </>
            )}
    </div>
      <form method="dialog" className="mt-4 text-right space-x-4">
        <Button>Add to Model</Button>
        <Button>Save</Button>
        <Button>Close</Button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
}
