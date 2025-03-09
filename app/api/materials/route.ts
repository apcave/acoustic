import { NextResponse } from "next/server";
import { getMaterials } from "@/actions/materials";

export async function GET() {
  // This is a public API, authentication is not required.
  try {
    const materials = await getMaterials();
    if (materials.status === "error") {
      return new NextResponse(
        { error: "Failed to fetch materials" },
        { status: 500 }
      );
    }
    return new NextResponse(JSON.stringify(materials.payload), { status: 200 });
  } catch (error) {
    return new NextResponse({ error: error.message }, { status: 500 });
  }
}
