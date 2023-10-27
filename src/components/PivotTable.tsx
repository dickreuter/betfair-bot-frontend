import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import { API_URL } from '../helper/Constants';
import './Table.css';
import { useAuthUser } from 'react-auth-kit';

const PlotlyRenderers = createPlotlyRenderers(Plot);

const PivotTable = ({ endpoint }) => {
  const auth = useAuthUser();
  const tokenRef = useRef(auth?.()?.token || 'default');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pivotState, setPivotState] = useState({});

  const cookieName = 'pivotState12'
  const defaultPivotState = {
    aggregatorName: "Sum",
    cols: ['country','side','bet_outcome'],
    rows: ['strategy_name'],
    vals: ['profit'],
    // Add other default values as needed
  };

  const extractStateToSave = (fullState) => {
    const {
      aggregatorName,
      colOrder,
      cols,
      rendererName,
      rowOrder,
      rows,
      vals,
      valueFilter,
      sorters,
      tableOptions,

    } = fullState;
    return {
      aggregatorName,
      colOrder,
      cols,
      rendererName,
      rowOrder,
      rows,
      vals,
      valueFilter,
      sorters,
      tableOptions,
    };
  };

  useEffect(() => {
    const savedState = Cookies.get(cookieName);
    if (savedState) {
      setPivotState(prevState => ({
        ...defaultPivotState,
        ...JSON.parse(savedState)
      }));
    }
  }, []);


  useEffect(() => {
    axios
    .post(`http://${API_URL}/${endpoint}`, 
    {  },
    {
      headers: {
        Authorization: `Bearer ${tokenRef.current}`,
        'Content-Type': 'application/json',
      },
      })
      .then((response) => {
        setOrders(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching:', error);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(pivotState).length !== 0) {
      const stateToSave = extractStateToSave(pivotState);
      Cookies.set(cookieName, JSON.stringify(stateToSave), { expires: 7 });
    }
  }, [pivotState]);

  return (
    <div className="pivot">
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <PivotTableUI
        data={orders}
        onChange={(s) => setPivotState(extractStateToSave(s))}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...{ ...defaultPivotState, ...pivotState }} // Merge with default state
      />
      )}
    </div>
  );
};

export default PivotTable;
