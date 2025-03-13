"use server";
import ModelForm from "@/components/multilayer/ModelForm";
import { getModel } from "@/server-actions/model";

interface Params {
  modelid: string;
}

export default async function ModelDetail({ params }: { params: Params }) {
  let debug = null;
  let model = null;
  const paramsOb = await params;
  const id = paramsOb.modelid;

  if (id) {
    const result = await getModel(id);
    if (result.status === "success") {
      console.log("<<<<<-------------------->>>>>>>>>>>>>>>>>");
      console.log("Got model from mongodb.... Yay!");
      console.log(result.payload);
      model = result.payload;
    } else if (result.status === "error") {
      debug = (
        <>
          {result.errorMessages.map((mes, index) => {
            return (
              <p key={index} className="urgent">
                {mes}{" "}
              </p>
            );
          })}
        </>
      );
    }
  } else {
    console.error("No model ID provided");
    debug = <p className="urgent">No model ID provided</p>;
  }

  return (
    <>
      {debug}
      <ModelForm orgModel={model} />
    </>
  );
}
