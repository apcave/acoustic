"use client";
import SweepForm from "@/components/multilayer/SweepForm";
import LayerList from "@/components/multilayer/LayerList";
import AcousticChart from "@/components/multilayer/AcousticChart";
import FinalizeModel from "@/components/multilayer/ModelFinalize";
import MaterialModal from "@/components/multilayer/MaterialModal";

import { iModel } from "@/lib/data-helpers";

import { RootState, AppDispatch } from "@/store/store";
import { setModel } from "@/store/modelSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "@/components/multilayer/ModelForm.css";

interface iModelFormProps {
  orgModel: iModel | null;
}

export default function ModelForm({ orgModel }: iModelFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const model = useSelector((state: RootState) => state.model.model);
  const error = useSelector((state: RootState) => state.ui.serverFeedback);

  const modelName = model.name || "";
  const modelDescription = model.description || "";

  useEffect(() => {
    if (orgModel) {
      console.log("<<<<<<<<<<<<<<<<<<<---------------------------------");
      console.log("Client updating model from server pre-render");
      dispatch(setModel(orgModel));
    }
  }, [orgModel, dispatch]);

  return (
    <>
      <div id="modal-root" />
      <MaterialModal />
      <div id="model-form">
        <h1>{modelName}</h1>
        <p>{modelDescription}</p>
        <SweepForm />
        <LayerList linkToEdit={false} />
        <FinalizeModel />
        {error ? (
          <>
            <h2>Server Error</h2>
            <p className="urgent">{error}</p>
          </>
        ) : (
          <AcousticChart />
        )}
      </div>
    </>
  );
}
