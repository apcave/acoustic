"use client";
import ModelItem from "@/components/multilayer/ModelItem";
import { iModel } from "@/lib/data-helpers";

export default function ModelList({ models }: { models: iModel[] }) {
  return (
    <div className="model-list">
      {models.map((model) => (
        <ModelItem key={model._id} model={model} />
      ))}
    </div>
  );
}
