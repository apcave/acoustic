"use client";
import { iMaterial, iProperty } from "@/lib/data-helpers";

import MaterialProperty from "@/components/multilayer/MaterialProperty";
import InputFloat from "@/components/InputFloat";
import { updateMaterial } from "@/store/materialActions";

import { useSession } from "next-auth/react";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { showEditMaterial } from "@/store/uiSlice";
import { updateLayerMaterial } from "@/store/modelSlice";
import { setEditMaterial } from "@/store/materialSlice";

import "@/components/multilayer/MaterialForm.css";
import { divide, pow, complex, Complex } from "mathjs";

/*
  Local state is used to update the UI and then a server action updates the materials database.
  The parent can be component is optimistically updated with with the new material properties after a successful POST.
  The form is either closed with escape, close or save buttons.
  In the case of escape or close the dialog closes and no changes are made.
*/
export default function MaterialForm() {
  const dispatch = useDispatch();
  const appDispatch = useDispatch<AppDispatch>();

  // This is used to check if the user is logged in.
  const { status, data } = useSession();

  const material = useSelector((state: RootState) => state.mat.editMaterial);
  const localCopy = useSelector((state: RootState) => state.mat.materialLocal);
  const serverState = useSelector((state: RootState) => state.ui.serverState);
  const serverFeedback = useSelector(
    (state: RootState) => state.ui.serverFeedback
  );

  // useEffect(() => {
  //   if (state.status === "success") {
  //     state.status = "idle";
  //     dispatch(saveEditToMaterials());
  //     dispatch(showEditMaterial(false));
  //   }
  // }, [state, dispatch]);

  if (!material) {
    return null;
  }

  let userId = "anonymous";
  if (status === "authenticated" && data?.user?._id) {
    userId = data.user._id;
  }

  type iPropType = "shear" | "compression";
  function handleChangeProperty(property: iProperty, propType: iPropType) {
    // The validation makes it not possible put in invalid material properties.

    const newMat = { ...material } as iMaterial;

    if (
      newMat.category === "vacuum" &&
      propType === "compression" &&
      property.type !== "vacuum"
    ) {
      newMat.category = "fluid";
      newMat.shear = {
        type: "fluid",
      };
    }

    // The material category is a derived property.
    if (propType === "compression" && property.type === "vacuum") {
      newMat.category = "vacuum";
      newMat.shear = {
        type: "vacuum",
        waveSpeed: undefined,
        attenuation: undefined,
        real: undefined,
        imag: undefined,
      };
    }

    if (propType === "shear" && property.type === "fluid") {
      newMat.category = "fluid";
    }

    if (
      propType === "shear" &&
      (property.type === "modulus" || property.type === "wave")
    ) {
      newMat.category = "solid";
    }

    newMat[propType] = property;

    dispatch(setEditMaterial(newMat));
  }

  function handleEdit(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    console.log("Edit Material - ", e.target.name, e.target.value);
    const name = e.target.name;
    const newMat = { ...material } as iMaterial;
    if (name === "name") {
      newMat.name = e.target.value;
    } else if (name === "density") {
      newMat.density = parseFloat(e.target.value);
    }
    dispatch(setEditMaterial(newMat));
  }
  let isMaterialValid = true;
  let errorMessage = null;
  if (material.category === "solid") {
    let M: Complex | null = null;
    let G: Complex | null = null;
    if (material.compression.type === "wave") {
      const c = material.compression.waveSpeed || 0;
      const a = material.compression.attenuation || 0;

      M = getModulus(c, a, material.density);
    }
    if (
      material.compression.type === "modulus" &&
      material.compression.real &&
      material.compression.imag
    ) {
      M = complex(material.compression.real, material.compression.imag);
    }
    if (material.shear.type === "wave") {
      const c = material.shear.waveSpeed || 0;
      const a = material.shear.attenuation || 0;

      G = getModulus(c, a, material.density);
    }
    if (material.shear.type === "modulus") {
      G = complex(material.shear.real || 0, material.shear.imag || 0);
    }

    if (!M || !G) {
      isMaterialValid = false;
      errorMessage = "Material is not valid. Modulus or wave speed is missing.";
    }

    if (M && G) {
      if (M.re < 2 * G.re) {
        isMaterialValid = false;
        errorMessage =
          "Material is not valid. Compression stiffness is more than twice shear stiffness.";
      }

      if (M.im < (4 / 3) * G.im) {
        isMaterialValid = false;
        errorMessage =
          "Material is not valid. Compression damping is less than 4/3 shear damping.";
      }
    }
  }

  function handleSave() {
    if (localCopy) {
      console.log("Save the material locally");

      dispatch(updateLayerMaterial(material));

      dispatch(showEditMaterial(false));
    } else {
      appDispatch(updateMaterial(material));
      console.log("Save the material to the server");
    }
  }

  return (
    <>
      {localCopy ? <h2>Data is Model Specific</h2> : <h2>Data is Global</h2>}
      <form id="material-form">
        <input type="hidden" name="id" value={material?._id} />
        <input type="hidden" name="userId" value={userId} />
        <h2>Material Properties - Material is a {material.category}</h2>
        <div>
          <label className="col" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="col"
            id="name"
            name="name"
            onChange={handleEdit}
            required
            pattern="\S+.*"
            title="Name cannot be empty or just whitespace"
            value={material.name}
          />
          <label htmlFor="density">Density (kg/m³)</label>
          <InputFloat
            id="density"
            name="density"
            required
            onChange={handleEdit}
            min={0}
            value={material.density}
          />
        </div>
        <MaterialProperty
          label="compression"
          property={material.compression}
          onChange={handleChangeProperty}
        />
        <MaterialProperty
          label="shear"
          property={material.shear}
          onChange={handleChangeProperty}
          compType={material.compression.type}
        />
      </form>
      <div className="status-group">
        {!isMaterialValid && errorMessage && (
          <p className="urgent">{errorMessage}</p>
        )}
        {serverState === "error" && <p className="urgent">{serverFeedback}</p>}
        <button onClick={() => dispatch(showEditMaterial(false))}>Close</button>
        <button
          disabled={!isMaterialValid || serverState === "pending"}
          onClick={handleSave}
        >
          {serverState === "pending" ? "Submitting..." : "Save Properties"}
        </button>
      </div>
    </>
  );
}

function getModulus(c: number, atten: number, rho: number): Complex {
  // Define the variables
  const omega = 16e3 * 2 * Math.PI * 100; // Omega is fixed at 16 kHz.
  const dBtoNp = Math.log(10) / 20; // Conversion factor from dB to Np
  if (atten === 0) {
    atten = 1e-6;
  }
  if (c === 0) {
    c = 1e-6;
  }

  // Calculate the complex modulus
  const WaveToModulus = divide(
    rho,
    pow(complex(1 / c, -((dBtoNp * atten) / omega)), 2)
  ) as Complex;

  // Output the result
  // console.log("WaveToModulus:", WaveToModulus);

  return WaveToModulus;
}
