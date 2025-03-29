"use client";

import { RootState } from "@/store/store";
import MaterialForm from "@/components/multilayer/MaterialForm";
import { showEditMaterial } from "@/store/uiSlice";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useSelector, useDispatch } from "react-redux";

import "@/components/multilayer/MaterialModal.css";

/*
  The component opens a dialog box to edit a material when the context editMaterial is set.
*/
export default function MaterialModal() {
  const dispatch = useDispatch();

  // The reference is required to make the box truly modal (background change and tint)
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const showModal = useSelector(
    (state: RootState) => state.ui.showEditMaterial
  );

  if (showModal) {
    dialogRef.current?.showModal();
  } else {
    dialogRef.current?.close();
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
      id="material-dialog"
      ref={dialogRef}
      onClose={() => dispatch(showEditMaterial(false))}
    >
      <div className="margin">
        <MaterialForm />
      </div>
    </dialog>,
    document.getElementById("modal-root") || document.body
  );
}
