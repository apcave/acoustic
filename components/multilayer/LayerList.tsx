import { iLayers } from "@/actions/layers-helper";
import Image from "next/image";

export default function LayerList({ layers }: { layers: iLayers }) {
  return (
    <div className="border rounded-md border-gray-300 mb-3">
      <span className="flex justify-center my-1">
        <h1 className="text-xl text-center font-bold">Material Layers</h1>

        <button className="ml-4 pr-2 pl-2 focus:outline-none text-sm rounded-md bg-stone-600 text-stone-300 hover:bg-stone-500 hover:text-stone-100">
          Save Layers to Model
        </button>
      </span>

      {layers.layers.length === 0 ? (
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
                <p className=" w-[30mm] border-l pl-3 font-bold">Height</p>
                <p className=" w-[65mm] border-l pl-2 font-bold">Material</p>
              </span>
            </li>
            {layers.layers.map((layer, index, array) => (
              <li
                key={index}
                className={
                  index === array.length - 1 ? "" : "border-b border-gray-300"
                }
              >
                <span className="flex">
                  <Image
                    src="/greenUpArrow.svg"
                    width="10"
                    height="4"
                    alt="up arrow"
                    className="my-2 ml-2 cursor-pointer"
                  />
                  <Image
                    src="/greenUpArrow.svg"
                    width="10"
                    height="4"
                    className="my-2 ml-2 cursor-pointer transform rotate-180"
                    alt="down arrow"
                  />
                  <p className=" w-[10mm] pl-3">{index + 1}</p>
                  <p className=" w-[33mm] border-l pl-3">
                    {layer.thickness} mm
                  </p>
                  <p className=" w-[65mm] border-l pl-2">
                    {layer.material.name}
                  </p>
                  <Image
                    src="/delete.svg"
                    width="15"
                    height="15"
                    className="ml-2 cursor-pointer"
                    alt="delete"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
