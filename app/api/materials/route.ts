import { NextResponse, NextRequest } from "next/server";
import { getMaterials, updateAddMaterial } from "@/server-actions/materials";
import { iMaterial } from "@/lib/data-helpers";

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
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const material: iMaterial = body;

    const result = await updateAddMaterial(material);
    if (result.status === "error") {
      const err_str = result.errorMessages.join(" ");
      return NextResponse.json({ error: err_str }, { status: 500 });
    }

    if (!result.payload) {
      throw new Error("Material not returned");
    }

    const material_stored = result.payload[0] as iMaterial;

    console.log("Material updated/added successfully");
    console.log(material_stored);

    return NextResponse.json(
      {
        status: "success",
        message: "Material uploaded successfully",
        material: material_stored,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 500 }
    );
  }
}
