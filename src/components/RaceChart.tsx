import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RaceProps } from '../helper/Types'; // Assuming you will create this types file
import { CustomTooltip } from './CustomTooltip';
import '../views/Races.css';
import { OverrunComponent } from './Overrun';

export const RaceChart: React.FC<RaceProps> = ({ raceId, raceTitle, horseData, overrunBack, overrunLay, overrunLast, secondsToStart, strategyStatus }) => {
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

    const toggleLineVisibility = (lineName: any) => {
        setLinesVisibility({
            ...linesVisibility,
            [lineName]: !linesVisibility[lineName],
        });
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
            <div>
                <input type="checkbox" id="back" checked={linesVisibility.back} onChange={() => toggleLineVisibility('back')} />
                <label htmlFor="back">Back</label>

                <input type="checkbox" id="backMovingAvg" checked={linesVisibility.backMovingAvg} onChange={() => toggleLineVisibility('backMovingAvg')} />
                <label htmlFor="backMovingAvg">Back Moving Average</label>

                <input type="checkbox" id="lay" checked={linesVisibility.lay} onChange={() => toggleLineVisibility('lay')} />
                <label htmlFor="lay">Lay</label>

                <input type="checkbox" id="layMovingAvg" checked={linesVisibility.layMovingAvg} onChange={() => toggleLineVisibility('layMovingAvg')} />
                <label htmlFor="layMovingAvg">Lay Moving Average</label>

                <input type="checkbox" id="last" checked={linesVisibility.last} onChange={() => toggleLineVisibility('last')} />
                <label htmlFor="last">Last</label>

                <input type="checkbox" id="lastMovingAvg" checked={linesVisibility.lastMovingAvg} onChange={() => toggleLineVisibility('lastMovingAvg')} />
                <label htmlFor="lastMovingAvg">Last Moving Average</label>

                <input type="checkbox" id="lastMin" checked={linesVisibility.lastMin} onChange={() => toggleLineVisibility('lastMin')} />
                <label htmlFor="lastMin">Last Min</label>

                <input type="checkbox" id="lastMax" checked={linesVisibility.lastMax} onChange={() => toggleLineVisibility('lastMax')} />
                <label htmlFor="lastMax">Last Max</label>
            </div>
            <div className="linechart">
                <LineChart width={800} height={chartHeight} data={horseDataWithOdds}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="horseId"
                        angle={-90}
                        textAnchor="end"
                        interval={0}
                        height={150}
                        style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}
                    />
                    <YAxis domain={[0, 1]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {linesVisibility.back && <Line type="monotone" dataKey="data.back" stroke="#8884d8" dot={{ r: 4 }} />}
                    {linesVisibility.backMovingAvg && <Line type="monotone" dataKey="data._back_moving_avg" stroke="#8884d8" strokeDasharray="5 5" />}
                    {linesVisibility.lay && <Line type="monotone" dataKey="data.lay" stroke="#82ca9d" dot={{ r: 4 }} />}
                    {linesVisibility.layMovingAvg && <Line type="monotone" dataKey="data._lay_moving_avg" stroke="#82ca9d" strokeDasharray="5 5" />}
                    {linesVisibility.last && <Line type="monotone" dataKey="data.last" stroke="#ffc658" dot={{ r: 4 }} />}
                    {linesVisibility.lastMovingAvg && <Line type="monotone" dataKey="data._last_moving_avg" stroke="#ffc658" strokeDasharray="5 5" />}
                    {linesVisibility.lastMin && <Line type="monotone" dataKey="data._last_min" stroke="#ff0000" dot={{ r: 4 }} />}
                    {linesVisibility.lastMax && <Line type="monotone" dataKey="data._last_max" stroke="#00ff00" dot={{ r: 4 }} />}

                </LineChart>
            </div>
        </div>
    );
};