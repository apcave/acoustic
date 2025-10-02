"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";

import "@/components/multilayer/LayerList.css";

import { RootState, AppDispatch } from "@/store/store";
import {
  moveLayerUp,
  moveLayerDown,
  deleteLayer,
  editLayer,
} from "@/store/modelSlice";
import { materialEditLocalCopy } from "@/store/materialSlice";
import { showEditMaterial } from "@/store/uiSlice";

import { iLayer } from "@/lib/data-helpers";
import InputFloat from "@/components/InputFloat";

import GreenArrow from "@/public/greenUpArrow.svg";
import Delete from "@/public/delete.svg";

export default function LayerList({ linkToEdit }: { linkToEdit: boolean }) {
  const layers = useSelector(
    (state: RootState) => state.model.model.composite.layers
  );
  const modelId = useSelector((state: RootState) => state.model.model._id);

  function handleSaveModel() {
    console.log("Save the context model to mongodb.....");
  }

  return (
    <div id="layer-list">
      <h2>Composite Material Layers</h2>

      {layers.length === 0 ? (
        <div>
          <p>Click on materials to add to model.</p>
          <p>Models requires at least two materials for an interface.</p>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th className="col1">Layer</th>
                <th className="col2">Height (mm)</th>
                <th className="col3">Material</th>
              </tr>
            </thead>
            <tbody>
              {layers.map((layer, index, array) => (
                <CompositeLayerItem
                  key={layer._id}
                  layer={layer}
                  index={index}
                  numLayers={array.length}
                />
              ))}
            </tbody>
          </table>
          {linkToEdit ? (
            <div>
              <Link
                onClick={handleSaveModel}
                className="link-button"
                style={{ marginTop: "6px" }}
                href={`/acoustic/models/${modelId}`}
              >
                Edit / Run Model
              </Link>
            </div>
          ) : (
            <div>
              <Link
                className="link-button"
                style={{ marginTop: "6px" }}
                href={`/acoustic/materials`}
              >
                Add Materials
              </Link>
            </div>
          )}
        </>
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
  if (isReflectMedium) {
    buttonLabel = "Medium (R)";
  }
  if (isTransmissionMedium) {
    buttonLabel = "Medium (T)";
  }
  if (needsEdit) {
    buttonLabel = "Edit";
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

  function handleMaterialSelect() {
    // console.log("Material selected: ", layer.material);
    dispatch(materialEditLocalCopy(layer.material));
    dispatch(showEditMaterial(true));
  }

  return (
    <tr>
      <td className={index === numLayers - 1 ? "col1" : "col1 line-bottom"}>
        <span className="move-span">
          <Image
            src={GreenArrow}
            alt="up arrow"
            className="arrow"
            onClick={() => dispatch(moveLayerUp(layer))}
          />
          <Image
            src={GreenArrow}
            className="arrow down"
            alt="down arrow"
            onClick={() => dispatch(moveLayerDown(layer))}
          />
          <p className="layer-num">{index + 1}</p>
        </span>
      </td>
      <td className={index === numLayers - 1 ? "col2" : "col2 line-bottom"}>
        {!buttonLabel && (
          <InputFloat
            disabled={!isCompositeLayer}
            onChange={(e) => handleEditThickness(e, layer)}
            value={layer.thickness}
            min={0}
            max={undefined}
          />
        )}
        {buttonLabel && (
          <p onClick={handleStartEdit} className={needsEdit ? "urgent" : ""}>
            {buttonLabel}
          </p>
        )}
      </td>
      <td className={index === numLayers - 1 ? "col3" : "col3 line-bottom"}>
        <span className="material-span">
          <button className="material-name" onClick={handleMaterialSelect}>
            {layer.material.name}
          </button>
          <Image
            src={Delete}
            className="delete"
            alt="delete"
            onClick={() => dispatch(deleteLayer(layer))}
          />
        </span>
      </td>
    </tr>
  );
}
