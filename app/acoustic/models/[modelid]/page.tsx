"use server";
import ModelForm from "@/components/multilayer/ModelForm";
import { getModel } from "@/server-actions/model";

/*
  This model detail page is specific to a model.
  This part of the page is pre-rendered and passes data on to the client side application.
  The database only stores validated models.
  If the model has not been saved the url is /acoustic/models/unsaved
  If otherwise the model ID is used instead of "unsaved".

  There is no model download API this is managed by React Server Components (RCS) and Next.js
  There is a model upload API which will have session management even if the user is not logged in.

  The intent is to re-render this page every time a model is updated.
  The models can also be accessed through the model browser page which redirects to this page.


  TODO:
  - Update the meta data for the models.
  - Invalidate the page every time the model is saved/run.
*/

interface args {
  modelid: string;
}

interface Params {
  params: Promise<args>;
}

export default async function ModelDetail({ params }: Params) {
  let debug = null;
  let model = null;
  const paramsOb = await params;
  const id = paramsOb.modelid;

  if (id) {
    if (id !== "unsaved") {
      const result = await getModel(id);
      if (result.status === "success") {
        // Model is defined and saved.
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
    }
  } else {
    console.error("No model ID provided");
    debug = <p className="urgent">No model ID provided</p>;
  }

  return <>{debug ? debug : <ModelForm orgModel={model} />}</>;
}
