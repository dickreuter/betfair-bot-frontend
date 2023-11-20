import React from 'react';
import data from './factors.json'; // Import the JSON data
import 'bootstrap/dist/css/bootstrap.css';

const Documentation = () => {
    // Access the array from the JSON object
    const dataAttributes = data.data_attributes;

    return (
        <>
            <div className="h3">
                Documentation of Strategy Factors
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Example</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAttributes.map((attribute, index) => (
                        <tr key={index}>
                            <td className="left-align text-left">{attribute.name}</td>
                            <td className="left-align text-left">{attribute.example}</td>
                            <td className="left-align text-left">{attribute.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Documentation;


