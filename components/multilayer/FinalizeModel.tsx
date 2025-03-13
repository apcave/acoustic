"use client";

import { RootState, AppDispatch } from "@/store/store";
import {
  editName,
  editDescription,
  setIncidentCompression,
} from "@/store/modelSlice";
import { saveModelToServer } from "@/store/modelActions";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "@/components/multilayer/FinalizeModel.css";

export default function FinalizeModel() {
  const [showEditDetails, setShowEditDetails] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const model = useSelector((state: RootState) => state.model);

  console.log("FinalizeModel", model);

  function handleSaveAndRun() {
    console.log("Save the model and run the simulation");
    console.log(model);
    console.log("TODO: Add validation for the composite section.");

    dispatch(saveModelToServer(model));
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
              value={model.name}
            />
          </div>
          <p className="left">Edit the Model Description</p>

          <textarea
            id="description"
            name="description"
            value={model.description}
            onChange={(e) => dispatch(editDescription(e.target.value))}
          />
        </>
      )}

      <div>
        <input
          id="incidentCompression"
          name="incidentCompression"
          className="twolines"
          type="checkbox"
          checked={model.incidentCompression}
          onChange={(e) => dispatch(setIncidentCompression(e.target.checked))}
        />

        <label htmlFor="incidentCompression">
          <p>Check for Incident Compression Wave</p>
          <p>Clear for Incident Shear Wave</p>
        </label>
      </div>
      <button onClick={handleSaveAndRun}>Run Simulation</button>
    </div>
  );
}
