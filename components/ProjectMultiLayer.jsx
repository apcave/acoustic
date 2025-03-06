import {useState, React} from "react";

import Description from "./multilayer/Description.jsx";
import ModifyModel from "./multilayer/ModifyModel.jsx";
import Analysis from "./multilayer/Analysis.jsx";
import Construction from "./Constuction.jsx";
import { AcousticContextProvider } from "./multilayer/AcousticContext.jsx";





export default function ProjectMultiLayer({navId}) {
    let content;
    switch (navId) {
        case 1:
            content = <Description />;
            break;
        case 2:
            content = <ModifyModel />;
            break;
        case 3:
            content = <Analysis />;
            break;
        default:
            content = <Description />;
    }

    return (
        <AcousticContextProvider>
        <Construction>
        <div 
            className="fixed overflow-hidden w-[300mm] h-[300mm] bg-stone-300 text-black shadow-md font-serif mx-auto p-8 rounded-md m-[20mm]"
            style={{ left: '400px' }}>
           <h1 className="text-3xl text-center font-bold mb-2">Multi-Layer Acoustic Modelling</h1>
           {content}
           </div>
        </Construction>
        </AcousticContextProvider>
    );
}