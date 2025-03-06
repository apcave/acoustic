import React from "react";


export default function Description() {
    return (
  
            <div className="bg-gray-100 text-gray-900">
    <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Web Application Overview</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p>This web application serves as a demonstration of my full-stack development skills. It is a work in progress, and I welcome feedback and testing as I actively seek new opportunities.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-3">Features & Technologies</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Back-end:</strong> Manages physics calculations, data storage, and authentication.</li>
                <li><strong>Front-end:</strong> Currently under development, focusing on enhancing my experience with React.</li>
                <li><strong>Technologies Used:</strong>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Front-end:</strong> JavaScript, React, Tailwind CSS</li>
                        <li><strong>Back-end:</strong> Python, Django</li>
                        <li><strong>Cloud Services:</strong>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>AWS Lambda for computation</li>
                                <li>AWS S3 for serving static files</li>
                                <li>AWS RDS for authentication</li>
                                <li>AWS DynamoDB for user data storage</li>
                            </ul>
                        </li>
                        <li><strong>Deployment:</strong> CI/CD pipeline using GitHub and AWS, with Test-Driven Development (TDD) for the back-end.</li>
                    </ul>
                </li>
                <li><strong>GitHub Repository:</strong> Access available upon request.</li>
            </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Application Focus</h2>
            <p>The application models the <strong>acoustic response</strong> (transmission and reflection) of <strong>heterogeneous, multi-layered materials</strong> in the form of infinite slabs excited by <strong>plane waves</strong>.</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Includes a material library where materials are defined by <strong>density, shear/compression wave speeds, attenuation</strong>, or <strong>shear/compressional modulus</strong>.</li>
                <li>Simulates <strong>amplitude and phase delay</strong> for a range of <strong>frequencies and angles of incidence</strong>.</li>
            </ul>
        </div>
    </div>
</div>
    );
}