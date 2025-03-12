"use server";
import ModelForm from "@/components/multilayer/ModelForm";
import { getModel } from "@/actions/model";

interface Params {
  modelid: string;
}

export default async function ModelDetail({ params }: { params: Params }) {
  let debug = null;
  let model = null;
  if (params.modelid) {
    const result = await getModel(params.modelid);
    if (result.status === "success") {
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
