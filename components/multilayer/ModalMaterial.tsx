'use client'
import { iMaterial, initialMaterial, initialUpdateMaterial } from '@/actions/material-helper';
import { updateAddMaterial } from '@/actions/materials';
import { useImperativeHandle, useRef, useState } from 'react';
import { createPortal, useFormState, useFormStatus } from 'react-dom';

import Button from '../Button.jsx';

import React from 'react';

interface iModalMaterialProps {
  ref: React.Ref<iModalHandle>;
  onChange: (material: iMaterial) => void;
}

export interface iModalHandle {
  open: (material: iMaterial) => void;
}

/*
  This component is a modal dialog box with a form for creating or editing material properties.
  When a material is edited the parent server component with a list of all materials needs to update.
  Local state is used to update the UI and then a server action updates the materials database.
  The parent component is optimistically updated with with the new material properties after a successful POST.
  The form is either closed with escape, close or save buttons.
  In the case of escape or close the dialog closes and no changes are made.
*/
export default function ModalMaterial({ref, onChange }: iModalMaterialProps) {

  // This ref is used to open the dialog from the parent component.
  const dialog = useRef<HTMLDialogElement | null>(null);

  // This used to update the material properties in the database on the server.
  const [state, formAction] = useFormState(updateAddMaterial, initialUpdateMaterial());

  // Used to provide feedback while the form is being submitted.
  const { pending } = useFormStatus();

  // This state is used to update the UI (combo boxes determine input fields)
  const [material, setMaterial] = useState(initialMaterial());

  // When the parent component opens the modal it passes the material to be edited.
  useImperativeHandle(ref, () => {
    return {
      open(material: iMaterial) {
        setMaterial(material);
        dialog.current?.showModal();
      },
    };
  });

  console.log('ModalMaterial - ', material);

  function handleCompType( newType : string ) {
    console.log(newType);
    setMaterial((prev) => {
      return {
        ...prev,
        compression: {
        type: newType,
        waveSpeed: 0,
        attenuation: 0,
        real: 0,
        imag: 0,
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
    <form id="material-form" action={formAction}  >
      <input type="hidden" name="_id" value={material._id} />
    <h1 className="text-2xl font-bold mb-4">Material Properties</h1>
    <div className="flex items-center mb-4">
        <label 
          className="block font-bold mr-4"
          htmlFor='name'>Name</label>
        <input 
          type="text"
          className="border rounded-md p-2 mr-4"
          id='name'
          name='name'
          required
          value={material.name} />
        <label 
          className="block font-bold mr-4"
          htmlFor="density">Density</label>
        <input 
          type='number'
          className="border rounded-md p-2 w-[40mm]"
          id='density'
          name='density'
          required
          value={material.density} />
    </div>

    <div className="align-center border rounded-md pt-1 pb-4 px-4 w-[200mm] h-[50mm]">
        <label className="block text-lg mb-2 font-bold">{compLabel}</label>
        <div className="flex items-center">
        <label 
          className="block text-lg mb-2 font-bold mr-4 p-2 w-[40mm]"
          htmlFor='compression'>Data Type</label>
        <select 
            id="compression"
            name='compression'
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
                <label 
                  htmlFor='compression-wave-speed'
                  className="block text-lg font-bold mr-4 p-2 w-[40mm]">Wave Speed</label>
                <input 
                  id='compression-wave-speed'
                  name='compression-wave-speed'
                  type="number" 
                  className="border rounded-md p-2 mr-4 w-[40mm]"
                  value={material.compression.waveSpeed} />
                <label 
                  htmlFor='compression-attenuation'
                  className="block text-lg font-bold w-[40mm]">Attenuation</label>
                <input 
                  id='compression-attenuation'
                  name='compression-attenuation'
                  type="number" 
                  className="border rounded-md p-2 w-[40mm]" 
                  value={material.compression.attenuation} />
            </div>)}
        {material.compression.type === 'modulus' && (
            <div className="flex items-center">
                <label 
                htmlFor='compression-real'
                className="block text-lg font-bold mr-4 p-2 w-[40mm]">Real (Pa)</label>
                <input 
                  id='compression-real'
                  name='compression-real'
                  type="number" 
                  className="border rounded-md p-2 mr-4 w-[40mm]"
                  value={material.compression.real} />
                <label 
                  htmlFor='compression-imag'
                  className="block text-lg font-bold mr-4 p-2 w-[40mm]">Imaginary (Pa)</label>
                <input
                  id='compression-imag'
                  name='compression-imag'
                  type="number" className="border rounded-md p-2 w-[40mm]"
                  value={material.compression.imag} />
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
        <label 
          htmlFor='shear'
          className="block text-lg mb-2 font-bold mr-4 p-2 w-[40mm]">Data Type</label>
        <select 
            id="shear"
            name='shear'
            required
            value={material.compression.type}
            onChange={(e) => handleCompType( e.target.value )}
            className="border rounded-md mb-2">
              <option value="wave">Wave</option>
              <option value="modulus">Modulus (σ)</option>
              <option value="fluid">Fluid</option>
        </select>
        </div>
        {material.compression.type === 'wave' && (
            <div className="flex items-center">
                <label 
                  htmlFor='shear-wave-speed'
                  className="block text-lg font-bold mr-4 p-2 w-[40mm]">Wave Speed</label>
                <input 
                  id='shear-wave-speed'
                  name='shear-wave-speed'
                  type="number" 
                  className="border rounded-md p-2 mr-4 w-[40mm]"
                  value={material.shear.waveSpeed} />
                <label
                  htmlFor='shear-attenuation'
                  className="block text-lg font-bold w-[40mm]">Attenuation</label>
                <input 
                  id='shear-attenuation'
                  name='shear-attenuation'
                  type="number"
                  className="border rounded-md p-2 w-[40mm]"
                  value={material.shear.attenuation} />
            </div>)}
        {material.compression.type === 'modulus' && (
            <div className="flex items-center">
                <label 
                  htmlFor='shear-real'
                  className="block text-lg font-bold mr-4 p-2 w-[40mm]">Real (Pa)</label>
                <input 
                  id='shear-real'
                  name='shear-real'
                  type="number" 
                  className="border rounded-md p-2 mr-4 w-[40mm]" 
                  value={material.shear.real} />
                <label 
                  htmlFor='shear-imag'
                  className="block text-lg font-bold mr-4 p-2 w-[40mm]">Imaginary (Pa)</label>
                <input
                  id='shear-imag'
                  name='shear-imag'
                  type="number"
                  className="border rounded-md p-2 w-[40mm]"
                  value={material.shear.imag} />
            </div>)}
        {material.compression.type === 'vacuum' && (
            <>
                <p>Vacuums do not support compression or shear waves.</p>
                <p>They are pure reflective layers that shift phase 180°.</p>
                </>
            )}
    </div>
      <div className="mt-4 text-right space-x-4">
      {state.status === 'error' &&
       state.errorMessages.map((mess, index) => <p key={index}>{mess}</p>)}
      <button disabled={pending}>
      {pending ? 'Submitting...' : 'Save Properties'}
    </button>        
        <Button>Close</Button>
        </div>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
}
