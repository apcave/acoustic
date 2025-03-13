"use client";
import ModelItem from "@/components/multilayer/ModelItem";
import { iModel } from "@/lib/data-helpers";

import "@/components/multilayer/ModelList.css";

export default function ModelList({ models }: { models: iModel[] }) {
  return (
    <div id="model-list">
      {models.map((model) => (
        <ModelItem key={model._id} model={model} />
      ))}
    </div>
  );
}
