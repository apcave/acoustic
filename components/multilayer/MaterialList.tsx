"use client";
import { useState, useRef, useEffect } from "react";

import ModalMaterial, {
  iModalHandle,
} from "@/components/multilayer/ModalMaterial";
import { iLayers, initialLayers } from "@/actions/layers-helper";
import { iMaterial, iProperty } from "@/actions/material-helper";
import LayerList from "@/components/multilayer/LayerList";

interface iMaterialListProps {
  materials: iMaterial[];
  propsLayers?: iLayers;
}


export default function MaterialList({
  materials,
  propsLayers,
}: iMaterialListProps) {
  console.log("MaterialList - ", materials, propsLayers);

  const [materialState, setMaterialState] = useState<iMaterial[]>(materials);
  const initialLayersState = propsLayers ? propsLayers : initialLayers();
  const [layersState, setLayersState] = useState<iLayers>(initialLayersState);

  const modalRef = useRef<iModalHandle | null>(null);

  // The materials data can change due to other users editing the database.
  // This effect fetches the materials every 10 seconds to keep the UI up to date.
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/api/materials");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMaterialState((prevState) => {
          // Check if the new data is different from the current state
          if (JSON.stringify(prevState) !== JSON.stringify(data)) {
            return data;
          }
          return prevState;
        });
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials(); // Initial fetch

    const interval = setInterval(fetchMaterials, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Adds a newly selected material to the layers.
  function handleAddMaterialToLayer(material: iMaterial) {
    console.log("Adding material", material);
    setLayersState((prev) => {
      const newLayer = {
        thickness: 0,
        material: material,
      };
      return {
        ...prev,
        layers: [...prev.layers, newLayer],
      };
    });
  }

  async function handleOptimisticUpdate(material: iMaterial) {
    /*
        A modal dialog is used to edit the material properties.
        Data collection and validation is done in the modal component.
        This function is called after a successful post to the API.
        For this to be called the user must have successfully edited the material properties.
        As such the modal dialog is no longer needed and can be closed.

        The update to the materials list also effects the modal properties.
        As such the modal needs to be closed before the state takes effect.
    */
    // Close the modal dialog
    modalRef?.current?.close();
    const materialExists = materialState.some(
      (mat) => mat._id === material._id
    );
    if (materialExists) {
      // Optimistically update the UI
      setMaterialState((prev) =>
        prev.map((mat) => (mat._id === material._id ? material : mat))
      );
    } else {
      // Optimistically update the UI
      setMaterialState((prev) => [...prev, material]);
    }
  }

  function launchMaterialModal(material: iMaterial) {
    // Make a copy of the material to avoid changing the original.
    modalRef?.current?.open({ ...material });
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value.toLowerCase();
    const filteredMaterials = materialState.filter((material) => {
      return material.name.toLowerCase().includes(search);
    });
    setMaterialState(filteredMaterials);
  }

  const materialList = materialState.map((material) => (
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
      <ModalMaterial ref={modalRef} onChange={handleOptimisticUpdate} />
      <div className="w-[170mm] bg-white text-black shadow-md font-serif mx-auto p-8 rounded m-[5mm] relative">
        <h1 className="text-2xl text-center mb-1 font-bold">
          Acoustic Material Properties
        </h1>

        <LayerList layers={layersState} />

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
