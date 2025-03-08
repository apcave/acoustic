'use server'

import MaterialList from '@/components/multilayer/MaterialList';
import { getMaterials } from '@/actions/materials';
import type { Metadata } from "next";
import { Suspense } from "react";

/*
    The list of material properties is important and will attract users to the site.
    This list needs to be searchable for the users to interact with the site.
    So a mix of server and client code is used to generate the page.
*/



// This function avoids fetching the data twice... next magic.
async function getData() {
  const materials = await getMaterials();
  return materials;
}

// Generate metadata for the page on the server side ensuring all materials are listed in the meta data.
export async function generateMetadata(): Promise<Metadata> {
  const materials = await getData();
  const materialNames = materials.slice(0, 5).map((m: { name: string }) => m.name).join(", ");

return {
    title: "Acoustic Materials",
    description: `List of acoustic materials and their shear compression,speed of sound, modules properties. Includes: ${materialNames}`,
};
}

// call the client side components.
export default async function MaterialServer() {
  const materials = await getData();

  return (
    <Suspense fallback={<p>Loading materials...</p>}>
      <MaterialList materials={materials} propsLayers={null} />
    </Suspense>
  );
}