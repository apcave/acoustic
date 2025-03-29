"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MaterialModal from "@/components/multilayer/MaterialModal";
import { iMaterial, iProperty, iniLayer } from "@/lib/data-helpers";
import LayerList from "@/components/multilayer/LayerList";

import { RootState, AppDispatch } from "@/store/store";
import { fetchMaterialsList } from "@/store/materialActions";
import {
  replaceMaterials,
  setEditGlobalMaterial,
  makeNewMaterial,
} from "@/store/materialSlice";
import { showEditMaterial } from "@/store/uiSlice";
import { addLayer } from "@/store/modelSlice";

import "@/components/multilayer/MaterialList.css";

interface iMaterialListProps {
  materials: iMaterial[];
}

export default function MaterialList({ materials }: iMaterialListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const materialState = useSelector((state: RootState) => state.mat.materials);
  const [filter, setFilter] = useState("");

  // Update the material list every 10 seconds in case another users changes the data.
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Updating materials list from server.");
      dispatch(fetchMaterialsList()); // Get the list from the server and move it to the state.
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Sets the materials list from server side code...
  // Only called once when the component mounts.
  useEffect(() => {
    dispatch(replaceMaterials(materials));
  }, [dispatch, materials]);

  let filterMats = [...materialState];
  if (filter.length > 0) {
    filterMats = filterMats.filter((material) => {
      return material.name.toLowerCase().includes(filter);
    });
  }
  filterMats.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // Adds a newly selected material to the layers.
  function handleAddMaterialToLayer(material: iMaterial) {
    //console.log("Adding material", material);

    const newLayer = iniLayer(material);
    dispatch(addLayer(newLayer));
  }

  function launchMaterialModal(material: iMaterial) {
    // Make a copy of the material to avoid changing the original.
    dispatch(setEditGlobalMaterial(material));
    dispatch(showEditMaterial(true));
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value.toLowerCase();
    setFilter(search);
  }

  function handleNewMaterial() {
    dispatch(makeNewMaterial());
    dispatch(showEditMaterial(true));
  }

  const materialList = filterMats.map((material) => (
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
      <div id="materials-list">
        <h1>Acoustic Material Properties</h1>

        <LayerList linkToEdit={true} />

        <h1>Available Materials</h1>
        <span className="search-bar">
          <input
            className="search-input"
            onChange={handleSearch}
            type="text"
            placeholder=" Search Materials"
          />
          <button onClick={handleNewMaterial}>New Material</button>
        </span>

        <ul>
          <li>
            <span>
              <h3 className="col1">Name</h3>
              <h3 className="col2">Density</h3>
              <h3 className="col3">Compression</h3>
              <h3 className="col4">Shear</h3>
              <h3 className="col5"></h3>
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

    if (!value.real) {
      throw new Error("Invalid modulus value");
    }

    let imag = 0;
    if (value.imag) {
      imag = value.imag;
    }

    text_l1 += value.real / 1e6 + " Re MPa + ";
    text_l2 += imag / 1e6 + " Im MPa";
  } else {
    text_l1 = "Fluid Material";
    text_l2 = "";
  }

  return (
    <div className={className}>
      <p>{text_l1}</p>
      <p>{text_l2}</p>
    </div>
  );
}

interface MaterialRowProps {
  material: iMaterial;
  onSelect: (mat: iMaterial) => void;
  onEdit: (mat: iMaterial) => void;
}

function MaterialRow({ material, onSelect, onEdit }: MaterialRowProps) {
  return (
    <>
      <li key={material._id}>
        <span>
          <span onClick={() => onSelect(material)} className="highlight">
            <p className="col1 border-right">{material.name}</p>

            <p className="col2 border-right">{material.density} kg/m³</p>
            <ModulusCell
              className="col3 border-right"
              isShear={false}
              value={material.compression}
            />
            <ModulusCell
              className="col4"
              isShear={true}
              value={material.shear}
            />
          </span>
          <button className="col5" onClick={() => onEdit(material)}>
            Edit
          </button>
        </span>
      </li>
    </>
  );
}
