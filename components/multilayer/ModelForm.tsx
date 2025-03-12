import SweepForm from "@/components/multilayer/SweepForm";
import LayerList from "@/components/multilayer/LayerList";
import { iModel } from "@/lib/data-helpers";

import { RootState, AppDispatch } from "@/store/store";
import {
  moveLayerUp,
  moveLayerDown,
  deleteLayer,
  editLayer,
} from "@/store/modelSlice";

import "@/components/multilayer/ModelForm.css";

interface iModelFormProps {
  model: iModel;
}

export default function ModelForm({ model }: iModelFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div id="model-form">
      <h1>Model Details</h1>
      <p>Finalize the model detail and run the physics simulation.</p>
      <SweepForm />
      <LayerList />
    </div>
  );
}
