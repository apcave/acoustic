"use client";

import { RootState, AppDispatch } from "@/store/store";
import {
  editName,
  editDescription,
  setIncidentCompression,
} from "@/store/modelSlice";
import { saveModelToServer } from "@/store/modelActions";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import "@/components/multilayer/ModelFinalize.css";

export default function FinalizeModel() {
  const router = useRouter();
  const [showEditDetails, setShowEditDetails] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const model = useSelector((state: RootState) => state.model.model);
  const [redirect, setRedirect] = useState(model._id);
  const composite = useSelector(
    (state: RootState) => state.model.model.composite
  );

  // Ensure model properties are always defined
  const modelName = model.name || "";
  const modelDescription = model.description || "";
  const incidentCompression = model.incidentCompression || false;

  // If the model is new and then saved redirect to the model detail page so the URL is correct.
  // If the model exists do not redirect after a save, show wait then results will refresh.
  console.log("<<<<<<<<<<<<<<<<---------------------------------");
  console.log("FinalizeModel render cycle.");
  console.log("Model ID:", model._id);

  useEffect(() => {
    if (model._id !== "unsaved" && redirect === "newSave") {
      setRedirect(model._id);
      router.push(`/acoustic/models/${model._id}`);
    }
  }, [model._id, redirect, router]);

  if (!composite.layers[0]) {
    return <></>;
  }
  const isRSolid = composite.layers[0].material.category === "solid";

  function handleSaveAndRun() {
    console.log("<<<<<<<<<<<<<<<<---------------------------------");
    console.log("Save the model and run the simulation");

    // This thunk updates state.
    dispatch(saveModelToServer(model));
    if (model._id === "unsaved") {
      setRedirect("newSave");
    }
  }

  return (
    <div id="finalize-model">
      <h2>Finalize Model</h2>

      <div>
        <input
          id="editDetails"
          name="editDetails"
          type="checkbox"
          checked={showEditDetails}
          onChange={(e) => setShowEditDetails(e.target.checked)}
        />

        <label htmlFor="editDetails">Check to Edit Name and Description</label>
      </div>
      {showEditDetails && (
        <>
          <div>
            <label className="name" htmlFor="name">
              Model Name
            </label>

            <input
              className="name"
              id="name"
              name="name"
              type="text"
              onChange={(e) => dispatch(editName(e.target.value))}
              value={modelName}
            />
          </div>
          <p className="left">Edit the Model Description</p>

          <textarea
            id="description"
            name="description"
            value={modelDescription}
            onChange={(e) => dispatch(editDescription(e.target.value))}
          />
        </>
      )}
      {isRSolid && (
        <div>
          <input
            id="incidentCompression"
            name="incidentCompression"
            className="twolines"
            type="checkbox"
            checked={incidentCompression}
            onChange={(e) => dispatch(setIncidentCompression(e.target.checked))}
          />
          <label htmlFor="incidentCompression">
            <p>Check for Incident Compression Wave</p>
            <p>Clear for Incident Shear Wave</p>
          </label>
        </div>
      )}
      <button onClick={handleSaveAndRun}>Run Simulation</button>
    </div>
  );
}
