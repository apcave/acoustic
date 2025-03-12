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
import { iLayer } from "@/lib/data-helpers";

export default function LayerList() {
  const layers = useSelector(
    (state: RootState) => state.model.composite.layers
  );
  const modelId = useSelector((state: RootState) => state.model._id);

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
          <div>
            <Link
              onClick={handleSaveModel}
              className="link-button"
              style={{ marginTop: "6px" }}
              href={`/acoustic/models/${modelId}`}
            >
              Edit Model
            </Link>
          </div>
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

  return (
    <tr>
      <td className={index === numLayers - 1 ? "col1" : "col1 line-bottom"}>
        <span className="move-span">
          <Image
            src="/greenUpArrow.svg"
            width="10"
            height="4"
            alt="up arrow"
            className="arrow"
            onClick={() => dispatch(moveLayerUp(layer))}
          />
          <Image
            src="/greenUpArrow.svg"
            width="10"
            height="4"
            className="arrow down"
            alt="down arrow"
            onClick={() => dispatch(moveLayerDown(layer))}
          />
          <p className="layer-num">{index + 1}</p>
        </span>
      </td>
      <td className={index === numLayers - 1 ? "col2" : "col2 line-bottom"}>
        {!buttonLabel && (
          <input
            disabled={!isCompositeLayer}
            onChange={(e) => handleEditThickness(e, layer)}
            value={layer.thickness}
            type="number"
            step="any"
            min="0"
          />
        )}
        {buttonLabel && (
          <p onClick={handleStartEdit} className={needsEdit ? "urgent" : ""}>
            {buttonLabel}
          </p>
        )}
      </td>
      <td className={index === numLayers - 1 ? "col3" : "col3 line-bottom"}>
        <span className="delete-span">
          <p>{layer.material.name}</p>
          <Image
            src="/delete.svg"
            width="15"
            height="15"
            className="delete"
            alt="delete"
            onClick={() => dispatch(deleteLayer(layer))}
          />
        </span>
      </td>
    </tr>
  );
}
