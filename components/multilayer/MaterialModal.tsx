"use client";
import { iMaterial, initialMaterial } from "@/actions/material-helper";
import MaterialForm from "@/components/multilayer/MaterialForm";

import { useImperativeHandle, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface iMaterialModalProps {
  ref: React.Ref<iModalHandle>;
  onChange: (material: iMaterial) => void;
}

export interface iModalHandle {
  open: (material: iMaterial) => void;
  close: () => void;
}

/*
  The modal is either closed with escape, close or save buttons.
  In the case of escape or close the dialog closes and no changes are made.
*/
export default function MaterialModal({ ref, onChange }: iMaterialModalProps) {
  // This ref is used to open the dialog from the parent component.
  const dialog = useRef<HTMLDialogElement | null>(null);

  // This state is used to update the UI (combo boxes determine input fields)
  const [material, setMaterial] = useState(initialMaterial());

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
      <MaterialForm
        material={material}
        setMaterial={setMaterial}
        onChange={onChange}
      />
      <button onClick={() => dialog.current?.close()}>Close</button>
    </dialog>,
    document.getElementById("modal-root") || document.body
  );
}
