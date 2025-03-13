import { iModel } from "@/lib/data-helpers";
import AcousticChart from "@/components/multilayer/AcousticChart";
import { redirect } from "next/navigation";

export default function ModelItem({ model }: { model: iModel }) {
  function handleClick() {
    console.log(`Clicked on model: ${model.name}`);

    // As this is a server component search engines can index these links.
    redirect(`/models/${model._id}`);
  }

  return (
    <div className="model-item" onClick={handleClick}>
      <h2>{model.name}</h2>
      <AcousticChart />
      <p>{model.description}</p>
    </div>
  );
}
