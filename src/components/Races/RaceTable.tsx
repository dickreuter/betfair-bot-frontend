import React, { useEffect, useState } from 'react';
import { Display } from 'react-7-segment-display';
import { RaceProps } from '../../helper/Types'; // Assuming you will create this types file
import '../../views/Races.css';
import { OverrunComponent } from '../Overrun';

export const RaceTable: React.FC<RaceProps> = ({ raceId, raceTitle, horseData, overrunBack, overrunLay, overrunLast, secondsToStart, strategyStatus, latency, orders }) => {
    const [prevHorseData, setPrevHorseData] = useState(horseData);
    const [flashingCells, setFlashingCells] = useState({});
    useEffect(() => {
        // Your existing logic
        const newFlashingCells = {};

        horseData.forEach((horse, index) => {
            ['back', 'lay', 'last'].forEach((field) => {
                if (isValueChanged(horse.data[field], prevHorseData[index]?.data[field])) {
                    newFlashingCells[`${index}_${field}`] = true;

                    // Remove 'flash' class after 1 second
                    setTimeout(() => {
                        setFlashingCells((prevFlashingCells) => {
                            const updated = { ...prevFlashingCells };
                            delete updated[`${index}_${field}`];
                            return updated;
                        });
                    }, 1000);
                }
            });
        });

        setFlashingCells(newFlashingCells);
        setPrevHorseData(horseData);
    }, [horseData]);

    const isValueChanged = (currentValue, previousValue) => {
        return currentValue !== previousValue;
    };

    let selectionIdPriceMap = {};
    if (Array.isArray(orders)) {
        // Use reduce to create a hashmap
        selectionIdPriceMap = orders.reduce((acc, order) => {
            acc[order.selection_id] = order.price;
            return acc;
        }, {});

        // console.log(selectionIdPriceMap);
    } else {
        selectionIdPriceMap = {};
        // console.log("orders is either not defined or not an array");
    }

    const StrategyStatusComponent = ({ strategyStatus }) => {
        if (!strategyStatus || typeof strategyStatus !== 'object') {
            return <div>Error: Strategy status is not available</div>;
        }

        return (
            <div className="strategy-status">
                <ul>
                    {Object.keys(strategyStatus).map((key) => (
                        <li key={key}>
                            <span>{key}:</span> <span>{strategyStatus[key]}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    const colors = [
        '#FFCCCC', '#CCFFCC', '#CCCCFF', '#FFCCE0', '#E0CCFF', '#CCE0FF', '#FFE0CC',
        '#D4E6F1', '#D5F5E3', '#FCF3CF', '#FAD7A0', '#D2B4DE', '#AED6F1', '#A2D9CE',
        '#F5CBA7', '#E6B0AA', '#D7DBDD', '#F7DC6F', '#D6EAF8', '#D0ECE7', '#F0E68C',
        '#F5DEB3', '#E1A3B3', '#C0D6DF', '#BFD8BD', '#F5E1A4', '#B2BABB', '#D5DBDB',
        '#D2B48C', '#FAE5D3', '#FADBD8', '#EBDEF0', '#DFFF00', '#FFDAB9', '#E0FFFF',
        '#F0FFF0', '#F0FFFF', '#F5F5DC', '#FFFACD', '#FFF8DC', '#FFFAF0', '#F8F8FF',
        '#F5F5F5', '#FFF5E1', '#FFEBE6', '#FFFAEB', '#FFF4F2', '#F5F5F5', '#FAFAFA'
    ];

    // Rest of the code remains the same


    const getColorFromHorseId = (horseId) => {
        const hash = horseId.split('').reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        return colors[Math.abs(hash) % colors.length];
    };

    let totalSeconds = Math.abs(Math.floor(secondsToStart));
    let sign = secondsToStart > 0 ? "-" : "";

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    const value = sign + hours + minutes + seconds
    function calculateAngle(value) {
        value = value * -200;
        value = Math.max(Math.min(value, 90), -90);
        return value
            ;
    }
    const disp_color = value => secondsToStart < 0 ? 'green' : 'red';

    return (
        <div>
            <div className='table-card row '>
                <div className="raceTitleTable mb-4" style={{ fontSize: "24px", marginTop: 0 }}>{raceTitle}</div>
                <div className='col-6'>
                    <OverrunComponent overrunBack={overrunBack} overrunLay={overrunLay} overrunLast={overrunLast} />
                </div>
                <div className='col-6'>
                    <StrategyStatusComponent strategyStatus={strategyStatus} />
                </div>
                <div className="latency col-6">
                    Internal execution latency: {latency}s
                </div>

                <div className="counter col-6">
                    {sign}{hours}h {minutes}m {seconds}s
                </div>
            </div>

            <div className='funTable-wrapper'>

                <table className="funTable">
                    <thead className='funTable-thead'>
                        <tr>
                            <th>Racer ID</th>
                            <th>Last</th>
                            <th>Back</th>
                            <th>Lay</th>
                            <th>Last Momentum</th>
                            <th>Back Momentum</th>
                            <th>Lay Momentum</th>

                            <th>Placed Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horseData.map((horse, index) => (
                            <tr key={index} style={{ backgroundColor: getColorFromHorseId(horse.horseId) }}>
                                <td>{horse.horseId}</td>
                                <td className={flashingCells[`${index}_last`] ? 'flash' : ''}>{horse.data.last}</td>
                                <td className={flashingCells[`${index}_back`] ? 'flash' : ''}>{horse.data.back}</td>
                                <td className={flashingCells[`${index}_lay`] ? 'flash' : ''}>{horse.data.lay}</td>
                                <td className={flashingCells[`${index}_last_ema`] ? 'flash' : ''}>
                                    <div>
                                        {horse.data._last_ema}
                                        <span style={{
                                            display: 'inline-block',
                                            transform: `rotate(${calculateAngle(horse.data._last_ema)}deg)`
                                        }}>→</span>
                                    </div>
                                </td>
                                <td className={flashingCells[`${index}_back_ema`] ? 'flash' : ''}>
                                    <div>
                                        {horse.data._back_ema}
                                        <span style={{
                                            display: 'inline-block',
                                            transform: `rotate(${calculateAngle(horse.data._back_ema)}deg)`
                                        }}>→</span>
                                    </div>
                                </td>
                                <td className={flashingCells[`${index}_lay_ema`] ? 'flash' : ''}>
                                    <div>
                                        {horse.data._lay_ema}
                                        <span style={{
                                            display: 'inline-block',
                                            transform: `rotate(${calculateAngle(horse.data._lay_ema)}deg)`
                                        }}>→</span>
                                    </div>
                                </td>

                                <td>
                                    {selectionIdPriceMap[horse.horseId] || ''} {/* New Cell */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
