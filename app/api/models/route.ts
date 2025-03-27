import { NextRequest, NextResponse } from "next/server";
import { iModel } from "@/lib/data-helpers";
import { updateModel } from "@/server-actions/model";

/**
 * Server side code the clients post models to be run to this end point.
 */

export async function POST(req: NextRequest) {
  try {
    console.log(
      ">>>>>>>>>>>>>>>>---------------------- POST Received By Next.js"
    );
    const body = await req.json();
    const model: iModel = body;

    console.log(
      "<<<<<<<<<<<<<<<<<---------------------- Model Received By Next.js"
    );
    //console.log(model);

    const result = await updateModel(model);
    if (result.status === "error") {
      const err_str = result.errorMessages.join(" ");

      console.log("acoustic-calcs, result : ", err_str);

      return NextResponse.json({ error: err_str }, { status: 500 });
    }

    console.log("<<<<<<<<<<<<<<<<<----------------------");
    console.log("Model uploaded successfully");

    if (!result.payload) {
      throw new Error("Model id not returned");
    }

    console.log("<<<<<<<<<<<<<<<<<----------------------");
    console.log("POST has model payload.");

    return NextResponse.json(
      { message: "Model uploaded successfully", model: result.payload },

      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("Catch ---> Error saving model:", error);

    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 500 }
    );
  }
}
