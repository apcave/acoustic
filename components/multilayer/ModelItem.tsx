import { iModel } from "@/lib/data-helpers";
import ChartPreview from "@/components/multilayer/ChartPreview";
import { useRouter } from "next/navigation";

import "@/components/multilayer/ModelItem.css";

export default function ModelItem({ model }: { model: iModel }) {
  const router = useRouter();

  function handleClick() {
    console.log(`Clicked on model: ${model.name}`);

    // As this is a server component search engines can index these links.
    router.push(`/acoustic/models/${model._id}`);
  }

  return (
    <div id="model-item" onClick={handleClick}>
      <h3>{model.name}</h3>
      <ChartPreview />
      <p>{model.description}</p>
    </div>
  );
}
