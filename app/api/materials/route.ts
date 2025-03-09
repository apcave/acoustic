import { NextResponse } from "next/server";
import { getMaterials } from "@/actions/materials";

export async function GET() {
  // This is a public API, authentication is not required.
  try {
    const materials = await getMaterials();
    if (materials.status === "error") {
      return NextResponse.json(
        { error: "Failed to fetch materials" },
        { status: 500 }
      );
    }
    return NextResponse.json(materials.payload, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
