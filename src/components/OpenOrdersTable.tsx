import React from 'react';
import './SimpleTable.css'

const SimpleTable = ({ data }) => {
    // Check if data is null or undefined, or not an object, and set to an empty object if so
    const safeData = data && typeof data === 'object' ? data : {};
    const dataArray = Object.values(safeData);
    const headers = dataArray.length > 0 ? Object.keys(dataArray[0]) : [];
    // console.log(data);
    return (
        <table className = 'table-container'>
            <thead>
                <tr>
                    <th>Placed orders:</th>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.entries(safeData).map(([marketId, row], rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{marketId}</td>
                        {headers.map((header, colIndex) => (
                            <td key={colIndex}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SimpleTable;
