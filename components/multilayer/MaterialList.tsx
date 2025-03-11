"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MaterialModal from "@/components/multilayer/MaterialModal";
import { iMaterial, iProperty, iniLayer } from "@/lib/data-helpers";
import LayerList from "@/components/multilayer/LayerList";

import { RootState, AppDispatch } from "@/store/store";
import { fetchMaterialsList } from "@/store/materialActions";
import { replaceMaterials, setEditMaterial } from "@/store/materialSlice";
import { showEditMaterial } from "@/store/uiSlice";
import { addLayer } from "@/store/modelSlice";

interface iMaterialListProps {
  materials: iMaterial[];
}

export default function MaterialList({ materials }: iMaterialListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const materialState = useSelector((state: RootState) => state.mat.materials);
  const [filteredMaterials, setMaterialFilter] = useState(materialState);

  // Update the material list every 10 seconds in case another users changes the data.
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchMaterialsList());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Sets the materials list from server side code...
  useEffect(() => {
    dispatch(replaceMaterials(materials));
    // TODO: Alphabetical sort of material names.
    setMaterialFilter(materials);
  }, [dispatch, materials]);

  // Adds a newly selected material to the layers.
  function handleAddMaterialToLayer(material: iMaterial) {
    console.log("Adding material", material);

    const newLayer = iniLayer(material);
    dispatch(addLayer(newLayer));
  }

  function launchMaterialModal(material: iMaterial) {
    // Make a copy of the material to avoid changing the original.
    dispatch(setEditMaterial(material));
    dispatch(showEditMaterial(true));
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value.toLowerCase();
    const data = materialState.filter((material) => {
      return material.name.toLowerCase().includes(search);
    });
    setMaterialFilter(data);
  }

  const materialList = filteredMaterials.map((material) => (
    <MaterialRow
      key={material._id}
      material={material}
      onSelect={handleAddMaterialToLayer}
      onEdit={launchMaterialModal}
    />
  ));

  return (
    <>
      <div id="modal-root" />
      <MaterialModal />
      <div id="acoustic-app">
        <h1>Acoustic Material Properties</h1>

        <LayerList />

        <span className="flex justify-center my-3">
          <h1 className="text-xl text-center font-bold">Available Materials</h1>
          <input
            onChange={handleSearch}
            type="text"
            placeholder=" Search Materials"
            className="ml-8 w-[40mm] border border-gray-300 rounded-md text-sm"
          />
          <button className="ml-2 p-1 focus:outline-none text-sm rounded-md bg-stone-600 text-stone-300 hover:bg-stone-500 hover:text-stone-100">
            New Material
          </button>
        </span>

        <ul className="flex flex-col items-center px-10">
          <li className="pb-0">
            <span className="flex w-[155mm]">
              <h2 className="px-3 w-[40mm] font-bold text-sm text-center">
                Name
              </h2>
              <h2 className="px-3 w-[20mm] font-bold text-sm text-center">
                Density
              </h2>
              <h2 className="px-3 w-[40mm] font-bold text-sm text-center">
                Compression
              </h2>
              <h2 className="px-3 w-[40mm] font-bold text-sm text-center">
                Shear
              </h2>
            </span>
          </li>
          {materialList}
        </ul>
      </div>
    </>
  );
}

interface ModulusCellProps {
  isShear: boolean;
  value: iProperty;
  className?: string; // Make className optional
}

function ModulusCell({ isShear, value, className }: ModulusCellProps) {
  let text_l1 = "";
  let text_l2 = "";
  if (value.type === "wave") {
    text_l1 = "Vel: " + value.waveSpeed + " m/s";
    text_l2 = "atten: " + value.attenuation + " dB/m";
  } else if (value.type === "modulus") {
    if (isShear) {
      text_l1 = "σ: ";
    } else {
      text_l1 = "K: ";
    }

    if (!value.real || !value.imag) {
      throw new Error("Invalid modulus value");
    }

    text_l1 += value.real / 1e6 + " Re MPa + ";
    text_l2 += value.imag / 1e6 + " Im MPa";
  } else {
    text_l1 = "Fluid Material";
    text_l2 = "";
  }

  return (
    <span>
      <p className={className}>{text_l1}</p>
      <p className={className}>{text_l2}</p>
    </span>
  );
}

interface MaterialRowProps {
  material: iMaterial;
  onSelect: (mat: iMaterial) => void;
  onEdit: (mat: iMaterial) => void;
}

function MaterialRow({ material, onSelect, onEdit }: MaterialRowProps) {
  const cellClasses = "px-3 py-0.5 leading-tight rounded text-sm";

  return (
    <>
      <li key={material._id} className="pb-1.5 flex">
        <span
          onClick={() => onSelect(material)}
          className="hover:border-blue-300 hover:bg-blue-100 flex border rounded-md shadow bg-stone-100"
        >
          <p className={cellClasses + " w-[40mm] border-r rounded-r-none"}>
            {material.name}
          </p>
          <p className={cellClasses + " w-[20mm] border-r rounded-r-none"}>
            {material.density} kg/m³
          </p>
          <ModulusCell
            className={cellClasses + " w-[40mm] border-r rounded-r-none"}
            isShear={false}
            value={material.compression}
          />
          <ModulusCell
            className={cellClasses + " w-[40mm]"}
            isShear={true}
            value={material.shear}
          />
        </span>
        <button
          className="w-[15mm] ml-1 focus:outline-none text-sm md:text-base rounded-md bg-stone-600 text-stone-300 hover:bg-stone-500 hover:text-stone-100"
          onClick={() => onEdit(material)}
        >
          Edit
        </button>
      </li>
    </>
  );
}
