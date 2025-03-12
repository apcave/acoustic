import { NextRequest, NextResponse } from "next/server";
import { iModel } from "@/lib/data-helpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const model: iModel = body;

    // Perform verification on the model
    if (!model.name || !model.description) {
      return NextResponse.json(
        { error: "Model verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Model uploaded successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 500 }
    );
  }
}
