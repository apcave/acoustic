import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";

import { RootState, AppDispatch } from "@/store/store";
import {
  moveLayerUp,
  moveLayerDown,
  deleteLayer,
  editLayer,
} from "@/store/modelSlice";
import { iLayer } from "@/actions/layers-helper";

export default function LayerList() {
  const layers = useSelector(
    (state: RootState) => state.model.composite.layers
  );
  const modelId = useSelector((state: RootState) => state.model._id);

  function handleSaveModel() {
    console.log("Save the context model to mongodb.....");
  }

  return (
    <div className="border rounded-md border-gray-300 mb-3">
      <h1 className="text-xl text-center font-bold">
        Composite Material Layers
      </h1>

      {layers.length === 0 ? (
        <>
          <p className="text-center text-sm">
            Click on materials to add to model.
          </p>
          <p className="text-center text-sm">
            Models requires at least two materials for an interface.
          </p>
        </>
      ) : (
        <div className="w-[100mm] mx-auto text-sm">
          <ul className="items-center py-3">
            <li className="items-center">
              <span className="flex">
                <p className=" w-[21mm] font-bold">Layer</p>
                <p className=" w-[40mm] border-l pl-3 font-bold">Height (mm)</p>
                <p className=" w-[65mm] border-l pl-2 font-bold">Material</p>
              </span>
            </li>
            {layers.map((layer, index, array) => (
              <CompositeLayerItem
                key={layer._id}
                layer={layer}
                index={index}
                numLayers={array.length}
              />
            ))}
          </ul>
          <Link
            onClick={handleSaveModel}
            className="ml-4 pr-2 pl-2 focus:outline-none text-sm rounded-md bg-stone-600 text-stone-300 hover:bg-stone-500 hover:text-stone-100"
            href={`/acoustic/models/${modelId}`}
          >
            Edit Model
          </Link>
        </div>
      )}
    </div>
  );
}

interface isCompositeLayerProps {
  index: number;
  numLayers: number;
  layer: iLayer;
}

function CompositeLayerItem({
  index,
  numLayers,
  layer,
}: isCompositeLayerProps) {
  const dispatch = useDispatch<AppDispatch>();

  const isReflectMedium = index === 0;
  const isTransmissionMedium = index === numLayers - 1;
  const isCompositeLayer = !isReflectMedium && !isTransmissionMedium;
  const needsEdit = isCompositeLayer && layer.thickness == 0;

  let buttonLabel = null;
  let cssClasses = "w-[33mm] border-l pl-3";
  if (isReflectMedium) {
    buttonLabel = "Medium (R)";
  }
  if (isTransmissionMedium) {
    buttonLabel = "Medium (T)";
  }
  if (needsEdit) {
    buttonLabel = "Edit";
    cssClasses += " underline text-red-600 border-black";
  }

  function handleEditThickness(
    event: React.ChangeEvent<HTMLInputElement>,
    layer: iLayer
  ) {
    const thickness = parseFloat(event.target.value);
    if (thickness && thickness > 0) {
      const newLayer = { ...layer, thickness } as iLayer;
      dispatch(editLayer(newLayer));
    }
  }

  function handleStartEdit() {
    const thickness = 7.9;
    const newLayer = { ...layer, thickness } as iLayer;
    dispatch(editLayer(newLayer));
  }

  return (
    <li className={index === numLayers - 1 ? "" : "border-b border-gray-300"}>
      <span className="flex">
        <Image
          src="/greenUpArrow.svg"
          width="10"
          height="4"
          alt="up arrow"
          className="my-2 ml-2 cursor-pointer"
          onClick={() => dispatch(moveLayerUp(layer))}
        />
        <Image
          src="/greenUpArrow.svg"
          width="10"
          height="4"
          className="my-2 ml-2 cursor-pointer transform rotate-180"
          alt="down arrow"
          onClick={() => dispatch(moveLayerDown(layer))}
        />
        <p className=" w-[10mm] pl-3">{index + 1}</p>
        {!buttonLabel && (
          <input
            className={cssClasses}
            disabled={!isCompositeLayer}
            onChange={(e) => handleEditThickness(e, layer)}
            value={layer.thickness}
            type="number"
            step="any"
            min="0"
          />
        )}
        {buttonLabel && (
          <p onClick={handleStartEdit} className={cssClasses}>
            {buttonLabel}
          </p>
        )}
        <p className=" w-[65mm] border-l pl-2">{layer.material.name}</p>
        <Image
          src="/delete.svg"
          width="15"
          height="15"
          className="ml-2 cursor-pointer"
          alt="delete"
          onClick={() => dispatch(deleteLayer(layer))}
        />
      </span>
    </li>
  );
}
