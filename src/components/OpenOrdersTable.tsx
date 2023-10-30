import './SimpleTable.css';

const ALLOWED_COLUMNS = [
    'strategy_name', 'total_matched', 'horse_name', 'price', 'last_traded', 'side', 'minutes_to_start', 'status'
];

const SimpleTable = ({ data }) => {
    // Check if data is null or undefined, or not an object, and set to an empty object if so
    const safeData = data && typeof data === 'object' ? data : {};
    const dataArray = Object.values(safeData);
    const headers = dataArray.length > 0 ? Object.keys(dataArray[0]).filter(header => ALLOWED_COLUMNS.includes(header)) : [];
    // console.log(data);
    return (
        <table className='table-container'>
            <thead>
                <tr>
                    <th>#</th>
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
