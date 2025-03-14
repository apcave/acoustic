"use server";
import { cache } from "react";
import MaterialList from "@/components/multilayer/MaterialList";
import { getMaterials } from "@/server-actions/materials";
import type { Metadata } from "next";
import { Suspense } from "react";

/*
    The list of material properties is important and will attract users to the site.
    This list needs to be searchable for the users to interact with the site.
    So a mix of server and client code is used to generate the page.

    The material data can be accessed by this page using React Server Components (RSC) or public materials API.
    The material data is stored using RSC and a React hook (useActionState) attached to a form.

    The public API provides a list of the materials in json format, it is polled to update the material list if anther user edit this list.
    Also, I may advertise this API for researchers and engineers.

    TODO:
    - check that the page is being invalided when the material list is updated in mongodb.
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
    .map((m: { name: string }) => m.name)
    .join(", ");

  const keywords: string[] = [
    "acoustic",
    "materials",
    "models",
    "resume",
    "sound",
    "wave",
    "react",
    "nextjs",
  ];
  materials.map((m: { name: string }) => keywords.push(m.name));

  return {
    title: "Acoustic Materials",
    description: `List of acoustic materials and their shear compression,speed of sound, modules properties. Includes: ${materialNames}`,
    keywords,
  };
}

export default async function HomePage() {
  const materials = await getData();
  return (
    <Suspense fallback={<p>Loading materials...</p>}>
      <MaterialList materials={materials} />
    </Suspense>
  );
}
