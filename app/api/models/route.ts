import { NextRequest, NextResponse } from "next/server";
import { iModel } from "@/lib/data-helpers";
import { updateModel } from "@/server-actions/model";

// function consoleLogModel(model: iModel) {
//   console.log("<<<<<<<<<<<<<<<------------------>>>>>>>>>>>>>>>");
//   console.log("Model:", model);
//   console.log("<<<<<<<<<<<<<<<------------------>>>>>>>>>>>>>>>");
//   console.log("Composite Layers:");
//   model.composite.layers.map((layer) => {
//     console.log("Layer:", layer);
//   });
// }

/*
  This API point takes a model in json as the payload in a POST request.
  The json is parsed and inserted into the database by server actions.
*/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const model: iModel = body;

    //consoleLogModel(model);
    console.log("<<<<<<<<<<<<<<<<<----------------------");
    console.log("Model received");

    const result = await updateModel(model);
    if (result.status === "error") {
      result.errorMessages.map((mes) => {
        console.log(mes);
      });

      return NextResponse.json(
        { error: "Failed to update model" },
        { status: 500 }
      );
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
    console.log("Error saving model:", error);

    return NextResponse.json(
      { error: (error as Error)?.message },
      { status: 500 }
    );
  }
}
