"use client";
import { iMaterial, iniMatActionStatus, iProperty } from "@/lib/data-helpers";
import { updateAddMaterial } from "@/actions/materials";

import MaterialProperty from "@/components/multilayer/MaterialProperty";

import { useActionState } from "react";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { showEditMaterial } from "@/store/uiSlice";
import { saveEditToMaterials, setEditMaterial } from "@/store/materialSlice";

/*
  Local state is used to update the UI and then a server action updates the materials database.
  The parent can be component is optimistically updated with with the new material properties after a successful POST.
  The form is either closed with escape, close or save buttons.
  In the case of escape or close the dialog closes and no changes are made.
*/
export default function MaterialForm() {
  const dispatch = useDispatch();

  // This is used to check if the user is logged in.
  const { status, data } = useSession();

  const material = useSelector((state: RootState) => state.mat.editMaterial);

  // This used to update the material properties in the database on the server.
  const [state, formAction, pending] = useActionState(
    updateAddMaterial,
    iniMatActionStatus()
  );

  useEffect(() => {
    if (state.status === "success") {
      state.status = "idle";
      dispatch(saveEditToMaterials());
      dispatch(showEditMaterial(false));
    }
  }, [state.status, dispatch]);

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

  return (
    <form id="material-form" action={formAction}>
      <input type="hidden" name="id" value={material?._id} />
      <input type="hidden" name="userId" value={userId} />
      <h1 className="text-2xl font-bold mb-4">
        Material Properties - state: {material.category}
      </h1>
      <div className="flex items-center mb-4">
        <label className="block font-bold mr-4" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="border rounded-md p-2 mr-4"
          id="name"
          name="name"
          onChange={handleEdit}
          required
          pattern="\S+.*"
          title="Name cannot be empty or just whitespace"
          value={material.name}
        />
        <label className="block font-bold mr-4" htmlFor="density">
          Density (kg/m³)
        </label>
        <input
          type="number"
          className="border rounded-md p-2 w-[40mm]"
          id="density"
          name="density"
          required
          onChange={handleEdit}
          step="any"
          min="0"
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
      <div className="mt-4 text-right space-x-4">
        {state.status === "error" &&
          state.errorMessages.map((mess, index) => <p key={index}>{mess}</p>)}
        <button disabled={pending}>
          {pending ? "Submitting..." : "Save Properties"}
        </button>
      </div>
    </form>
  );
}
