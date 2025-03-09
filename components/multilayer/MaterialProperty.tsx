import {iProperty} from '@/actions/material-helper';

import { useState } from 'react';
 

interface iMaterialProperty {
  label: string;
  property: iProperty;
}

/*
    The material property can be edited by the user.
    The changes in state do not change the material object.
    When the parent form is submitted, the material object is updated.
    This is resolved by the component names.
*/
export default function MaterialProperty({ label, property } : iMaterialProperty) {
    const [ propertyState, setPropertyState ] = useState<iProperty>(property);


    function handleEdit(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const name = e.target.name;
        const value = e.target.value;
        if (name === label) {
            setPropertyState((prev) => ({
            ...prev,
            type: value,}));
        } else if (name === `${label}-wave-speed`) {
            setPropertyState((prev) => ({
            ...prev,
            real: undefined,
            imag: undefined,
            waveSpeed: parseFloat(value),}));
        }
        else if (name === `${label}-attenuation`) {
            setPropertyState((prev) => ({
            ...prev,
            real: undefined,
            imag: undefined,
            attenuation: parseFloat(value),}));
        }
        else if (name === `${label}-real`) {
            setPropertyState((prev) => ({
            ...prev,
            waveSpeed: undefined,
            attenuation: undefined,
            real: parseFloat(value),}));
        }
        else if (name === `${label}-imag`) {
            setPropertyState((prev) => ({
            ...prev,
            waveSpeed: undefined,
            attenuation: undefined,
            imag: parseFloat(value),}));
        }
    }

    return (
        <div className="align-center border rounded-md pt-1 pb-4 px-4 mt-4 w-[200mm] h-[50mm]">
        <label className="block text-lg mb-2 font-bold">{label}</label>
        <div className="flex items-center">
        <label 
          htmlFor={label}
          className="block text-lg mb-2 font-bold mr-4 p-2 w-[40mm]">Data Type</label>
        <select 
            id={label}
            name={label}
            required
            value={propertyState.type}
            onChange={handleEdit}
            className="border rounded-md mb-2">
              <option value="wave">Wave</option>
              <option value="modulus">Modulus (σ)</option>
              {label === 'compression' && <option value="vacuum">Vacuum</option>}
              {label === 'shear' && <option value="fluid">Fluid</option>}
        </select>
        </div>
        {propertyState.type === 'wave' && (
            <div className="flex items-center">
                <label 
                  htmlFor={`${label}-wave-speed`}
                  className="block text-lg font-bold mr-4 p-2 w-[40mm]">Wave Speed (m/s)</label>
                <input 
                  id={`${label}-wave-speed`}
                  name={`${label}-wave-speed`}
                  type="number" 
                  className="border rounded-md p-2 mr-4 w-[40mm]"
                  onChange={handleEdit}
                  min='0'
                  value={propertyState.waveSpeed} />
                <label
                  htmlFor={`${label}-attenuation`}
                  className="block text-lg font-bold w-[40mm]">Attenuation (db/m)</label>
                <input 
                  id={`${label}-attenuation`}
                  name={`${label}-attenuation`}
                  type="number"
                  className="border rounded-md p-2 w-[40mm]"
                  onChange={handleEdit}
                  value={propertyState.attenuation} />
            </div>)}
        {propertyState.type === 'modulus' && (
            <div className="flex items-center">
                <label 
                  htmlFor={`${label}-real`}
                  className="block text-lg font-bold mr-4 p-2 w-[40mm]">Real (Pa)</label>
                <input 
                  id='shear-real'
                  name='shear-real'
                  type="number" 
                  className="border rounded-md p-2 mr-4 w-[40mm]" 
                  onChange={handleEdit}
                  min='0'
                  value={propertyState.real} />
                <label 
                  htmlFor='shear-imag'
                  className="block text-lg font-bold mr-4 p-2 w-[40mm]">Imaginary (Pa)</label>
                <input
                  id='shear-imag'
                  name='shear-imag'
                  type="number"
                  className="border rounded-md p-2 w-[40mm]"
                  onChange={handleEdit}
                  min='0'
                  value={propertyState.imag} />
            </div>)}
        {propertyState.type === 'vacuum' && (
            <>
                <p>Vacuums do not support compression or shear waves.</p>
                <p>They are pure reflective layers that shift phase 180°.</p>
                </>
        )}
        {propertyState.type === 'fluid' && (
                <p>Fluids do not support shear waves.</p>
        )}

    </div>);
}