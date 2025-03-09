"use server";
import { cache } from "react";
import MaterialList from "@/components/multilayer/MaterialList";
import { getMaterials } from "@/actions/materials";
import type { Metadata } from "next";
import { Suspense } from "react";
import { iLayers, initialLayers } from "@/actions/layers-helper";
import { iMaterial } from "@/actions/material-helper";
/*
    The list of material properties is important and will attract users to the site.
    This list needs to be searchable for the users to interact with the site.
    So a mix of server and client code is used to generate the page.
*/

// This function avoids fetching the data twice... next magic.
const getData = cache(async () => {
  const materials = await getMaterials();
  return materials.payload;
});

// Generate metadata for the page on the server side ensuring all materials are listed in the meta data.
export async function generateMetadata(): Promise<Metadata> {
  const materials = await getData();
  const materialNames = materials
    .slice(0, 5)
    .map((m: { name: string }) => m.name)
    .join(", ");

  return {
    title: "Acoustic Materials",
    description: `List of acoustic materials and their shear compression,speed of sound, modules properties. Includes: ${materialNames}`,
  };
}

export default async function HomePage() {
  const materials = await getData();
  return (
    <Suspense fallback={<p>Loading materials...</p>}>
      <MaterialList materials={materials} propsLayers={null} />
    </Suspense>
  );
}
