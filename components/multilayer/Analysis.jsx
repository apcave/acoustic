import React from "react";

import AcousticChart from "./AcousticChart.jsx";

export default function Analysis() {
    console.log('Analysis');
    return (
        <>
        <div>
            <h1 className="text-3xl text-center mb-2">Analysis</h1> 
        </div>
        <AcousticChart />
        <AcousticChart />
        </>
    );
}