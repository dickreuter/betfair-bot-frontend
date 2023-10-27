import React, { useEffect, useState } from 'react';
import { RaceProps } from '../../helper/Types'; // Assuming you will create this types file
import '../../views/Races.css';
import { OverrunComponent } from '../Overrun';

export const RaceTable: React.FC<RaceProps> = ({ raceId, raceTitle, horseData, overrunBack, overrunLay, overrunLast, secondsToStart, strategyStatus }) => {
    const [linesVisibility, setLinesVisibility] = useState({
        back: true,
        backMovingAvg: false,
        lay: true,
        layMovingAvg: false,
        last: true,
        lastMovingAvg: false,
        lastMin: false,
        lastMax: false,
    });
    const [prevHorseData, setPrevHorseData] = useState(horseData);

    const toggleLineVisibility = (lineName: any) => {
        setLinesVisibility({
            ...linesVisibility,
            [lineName]: !linesVisibility[lineName],
        });
    };
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


    const horseDataWithOdds = horseData.map((horse) => ({
        horseId: horse.horseId,
        data: {
            back: horse.data.back ? 1 / horse.data.back : null,
            lay: horse.data.lay ? 1 / horse.data.lay : null,
            last: horse.data.last ? 1 / horse.data.last : null,
            _back_overrun: horse.data._back_overrun,
            _lay_overrun: horse.data._lay_overrun,
            _back_moving_avg: horse.data._back_moving_avg ? 1 / horse.data._back_moving_avg : null,
            _lay_moving_avg: horse.data._lay_moving_avg ? 1 / horse.data._lay_moving_avg : null,
            _last_moving_avg: horse.data._last_moving_avg ? 1 / horse.data._last_moving_avg : null,
            _last_min: horse.data._last_min ? 1 / horse.data._last_min : null,
            _last_max: horse.data._last_max ? 1 / horse.data._last_max : null,
            _horse_name: horse.data._runner_name,
            _horse_info: horse.data._horse_info,
            _strategy_status: horse.data._strategy_status,
        },
    }));


    const chartHeight = 400;
    let totalSeconds = Math.abs(Math.floor(secondsToStart));
    let sign = secondsToStart > 0 ? "-" : "";

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return (
        <div>
            <div className="raceTitle">{raceTitle}</div>
            <OverrunComponent overrunBack={overrunBack} overrunLay={overrunLay} overrunLast={overrunLast} />
            <StrategyStatusComponent strategyStatus={strategyStatus} />
            <p>
                {sign}{hours}h {minutes}m {seconds}s
            </p>
            <table className="funTable">
                <thead>
                    <tr>
                        <th>Horse ID</th>
                        <th>Back</th>
                        <th>Lay</th>
                        <th>Last</th>
                    </tr>
                </thead>
                <tbody>
                    {horseData.map((horse, index) => (
                        <tr key={index}>
                            <td title={horse.horseId}>{horse.horseId}</td>
                            <td className={flashingCells[`${index}_back`] ? 'flash' : ''} title={horse.data.back}>{horse.data.back}</td>
                            <td className={flashingCells[`${index}_lay`] ? 'flash' : ''} title={horse.data.lay}>{horse.data.lay}</td>
                            <td className={flashingCells[`${index}_last`] ? 'flash' : ''} title={horse.data.last}>{horse.data.last}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
