"use client";
import {
  iMaterial,
  initialMaterial,
  iniMatActionStatus,
  iProperty,
} from "@/actions/material-helper";
import { updateAddMaterial } from "@/actions/materials";

import MaterialProperty from "@/components/multilayer/MaterialProperty";

import { useImperativeHandle, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useActionState } from "react";
import { useSession } from "next-auth/react";

interface iModalMaterialProps {
  ref: React.Ref<iModalHandle>;
  onChange: (material: iMaterial) => void;
}

export interface iModalHandle {
  open: (material: iMaterial) => void;
  close: () => void;
}

/*
  This component is a modal dialog box with a form for creating or editing material properties.
  When a material is edited the parent server component with a list of all materials needs to update.
  Local state is used to update the UI and then a server action updates the materials database.
  The parent component is optimistically updated with with the new material properties after a successful POST.
  The form is either closed with escape, close or save buttons.
  In the case of escape or close the dialog closes and no changes are made.
*/
export default function ModalMaterial({ ref, onChange }: iModalMaterialProps) {
  // This is used to check if the user is logged in.
  const { status, data } = useSession();

  // This ref is used to open the dialog from the parent component.
  const dialog = useRef<HTMLDialogElement | null>(null);

  // This used to update the material properties in the database on the server.
  const [state, formAction, pending] = useActionState(
    updateAddMaterial,
    iniMatActionStatus()
  );

  // This state is used to update the UI (combo boxes determine input fields)
  const [material, setMaterial] = useState(initialMaterial());

  let userId = "anonymous";
  if (status === "authenticated" && data?.user?.id) {
    userId = data.user.id;
  }

  // useEffect is required to update the parent state this cannot be done during a child render.
  useEffect(() => {
    if (state.status === "success") {
      state.status = "idle";
      onChange({ ...material });
      setMaterial(initialMaterial());
    }
  }, [state, onChange, material]);

  // When the parent component opens the modal it passes the material to be edited.
  useImperativeHandle(ref, () => {
    return {
      open(material: iMaterial) {
        setMaterial(material);
        dialog.current?.showModal();
      },
      close() {
        dialog.current?.close();
      },
    };
  });

  type iPropType = "shear" | "compression";
  function handleChangeProperty(property: iProperty, propType: iPropType) {
    // The validation makes it not possible put in invalid material properties.

    setMaterial((prev) => {
      const newMat = { ...prev };
      // The material category is a derived property.

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

      console.log("New Material - ", newMat);

      return newMat;
    });
  }

  function handleEdit(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = e.target.name;
    setMaterial((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  }

  // This logic is used with the portal to ensure the dialog is rendered on the client side only.
  // The id tag for the portal is only valid on the client side.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      <form id="material-form" action={formAction}>
        <input type="hidden" name="_id" value={material._id} />
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
          <button disabled={pending} onClick={() => dialog.current?.close()}>
            Close
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal-root") || document.body
  );
}
