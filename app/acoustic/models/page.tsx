"use server";
import ModelList from "@/components/multilayer/ModelList";

import { cache } from "react";
import { getAllModels } from "@/server-actions/model";
import { iModel } from "@/lib/data-helpers";

import type { Metadata } from "next";
import { Suspense } from "react";

// This function avoids fetching the data twice... next magic.
const getData = cache(async () => {
  const materials = await getAllModels();
  return materials.payload as iModel[];
});

// Generate metadata for the page on the server side ensuring all materials are listed in the meta data.
export async function generateMetadata(): Promise<Metadata> {
  const allModels = await getData();

  let modelsNames = "composite materials";

  if (allModels.length > 0) {
    modelsNames = allModels
      .slice(0, 5)
      .map((m: { name: string }) => m.name)
      .join(", ");
  }

  return {
    title: "Acoustic Composite Material Models and Results",
    description: `List of acoustic materials and their shear compression,speed of sound, modules properties. Includes: ${modelsNames}`,
  };
}

export default async function Page() {
  const allModels = await getData();

  return (
    <Suspense fallback={<p>Loading models...</p>}>
      <ModelList models={allModels} />
    </Suspense>
  );
}
