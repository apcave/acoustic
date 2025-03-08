'use server'

import ModalMaterial from "./ModalMaterial.jsx";
import Button from "../Button.jsx";
import {getMaterials} from "@/actions/materials.ts";

export default async function ModifyModel() {
    const modalRef = useRef();
    const materials = await getMaterials();
    let materialList = [];
    materialList.push(
        materials.map((material, index) => {
        return (
            <MaterialRow key={index} material={material} />
        );
    }));

    function handleMaterialSelect() {
    }


    return (
        <>
        <ModalMaterial ref={modalRef} value={null} />     
        <div className="align-center text-center border rounded-md shadow-md bg-stone-200 p-4">
            <h1 className="text-2xl text-center mb-2 font-bold">Material Properties</h1>
            <ul className="flex flex-col items-center px-10">
            <li className="pb-0">
                <span className="flex w-[220mm]"  >
 
                <h2 className="px-3 w-[45mm] font-bold" >Name</h2>
                <h2 className="px-3 w-[25mm] font-bold" >Density</h2>
                <h2 className="px-3 w-[75mm] font-bold" >Compressional Wave</h2>
                <h2 className="px-3 w-[75mm] font-bold">Shear Wave</h2>
                </span>
            </li>
            {materialList}
            </ul>
            <div className="pt-5">
            <Button onClick={handleMaterialSelect}>Add Material</Button>
            </div>
        </div>
        </>
    );
}


function ModulusCell({ isShear, value, ...props }) {
    let text;
    if (value.type === 'wave') {
        text =  "Vel: " + value.waveSpeed + " m/s, atten: " + value.attenuation + " dB/m";
    }
    else if (value.type === 'modulus') {
        if (isShear) {
            text = "σ: ";
        } else {
            text = "K: ";
        }
        text += value.real / 1e6 + " Re MPa + ";
        text += value.imag / 1e6 + " Im MPa";
    } else {
        text = "Fluid Material";
    }


    return (
        <p {...props}>{text}</p>
    );
}

// Need to check if row updates when matrial is edited in the modal.
function MaterialRow({material}) {
    const modalRef = useRef();

    function handleMaterialSelect() {
        modalRef.current.open();
    }

    const cellClasses = "px-3 py-1.5 leading-tight border rounded";

    return (
        <>
        <ModalMaterial ref={modalRef} value={material} />        
            <li key={material.id} className="pb-1.5" onClick={handleMaterialSelect}>
                <span className="hover:border-green-300 hover:bg-green-100 flex border rounded-md shadow w-[220mm] bg-stone-100"  >
                <p className={cellClasses + " w-[45mm]"}>{material.name}</p>
                <p className={cellClasses + " w-[25mm]"}>{material.density}</p>
                <ModulusCell className={cellClasses + " w-[75mm]"} isShear={false} value={material.compression} />
                <ModulusCell className={cellClasses + " w-[75mm]"} isShear={true} value={material.shear} />
                </span>
            </li>
            </>
        );
    }