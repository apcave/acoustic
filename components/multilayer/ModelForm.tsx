"use client";
import SweepForm from "@/components/multilayer/SweepForm";
import LayerList from "@/components/multilayer/LayerList";
import AcousticChart from "@/components/multilayer/AcousticChart";
import FinalizeModel from "@/components/multilayer/FinalizeModel";

import { iModel } from "@/lib/data-helpers";

import { RootState } from "@/store/store";

import { useSelector } from "react-redux";

import "@/components/multilayer/ModelForm.css";

interface iModelFormProps {
  orgModel: iModel | null;
}

export default function ModelForm({ orgModel }: iModelFormProps) {
  //const dispatch = useDispatch<AppDispatch>();
  const model = useSelector((state: RootState) => state.model);

  console.log("ModelForm", model);

  // useEffect(() => {
  //   if (orgModel) {
  //     dispatch(editModel(orgModel));
  //   }
  // }, [orgModel, dispatch]);

  return (
    <div id="model-form">
      <h1>
        {model.name}
        {orgModel?.name}
      </h1>
      <p>{model.description}</p>
      <SweepForm />
      <LayerList linkToEdit={false} />
      <FinalizeModel />
      <AcousticChart />
    </div>
  );
}
