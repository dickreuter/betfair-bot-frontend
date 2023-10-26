import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useRef, useState } from 'react';
import ConditionsManager from '../components/StrategyEditor/ConditionsManager';
import { API_URL, DATA_ATTRIBUTES } from '../helper/Constants';
import CustomSlider from './CustomSlider';
import './Strategy.css';
import { useAuthUser } from 'react-auth-kit';
import { useAuthHeader } from 'react-auth-kit';
import 'bootstrap/dist/css/bootstrap.css';

interface IAttributesConfig {
  active: string;
  market_type: string;
  StrategyName: string;
  selectedCountries: string[];
  selectedSportType: string;
  betType: string;
  betSize: number;
  priceStrategy: string;
  priceMinValue: number;
  priceMaxValue: number;
  maxHorsesToBet: number;
  maxHorsesToBetStrategy: number;
  harnessSelection: string;

  missingConditionsData: string;
  secsToStartSlider: number[];
}

const defaultAttributesConfig: IAttributesConfig = {
  active: "off",
  StrategyName: "",
  market_type: "WIN",
  selectedCountries: [],
  selectedSportType: "Horse Racing",
  betType: "",
  harnessSelection: "Any",
  betSize: 1,
  priceStrategy: "last",
  priceMinValue: 1,
  priceMaxValue: 999,
  maxHorsesToBet: 50,
  maxHorsesToBetStrategy: 100,
  missingConditionsData: "risk",
  secsToStartSlider: [-3600, 600],
};


const Strategy = () => {
  const auth = useAuthUser();
  const tokenRef = useRef(auth?.()?.token || 'default');

  const getAuthHeader = useAuthHeader();
  const authHeader = getAuthHeader();
  console.log(authHeader);  // Outputs: 'Bearer your_token_here'


  const [availableStrategies, setAvailableStrategies] = useState<string[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");
  const [data, setData] = useState<IAttributesConfig>(defaultAttributesConfig);


  // Function to display Bootstrap alerts
  const displayAlert = (message, type) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fixed-bottom text-center mb-0 rounded-0`;
    alertDiv.innerHTML = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  };


  const updateData = (attr: string, newMin?: number, newMax?: number) => {
    // Clone the existing attributesConfig state
    const updatedAttributesConfig = { ...data };

    // Update the specific attribute's min and max values
    updatedAttributesConfig[attr] = {
      min: newMin !== undefined ? newMin : data[attr]?.min,
      max: newMax !== undefined ? newMax : data[attr]?.max,
    };

    // Update the state
    setData(updatedAttributesConfig);
  };

  const saveStrategy = () => {
    if (!data.StrategyName) {
      displayAlert('Enter a strategy name under which to save the configuration', 'danger');
      return;
    }

    for (const attr of DATA_ATTRIBUTES) {
      if (data.hasOwnProperty(attr)) {
        if (data[attr]?.min === undefined || data[attr]?.max === undefined) {
          displayAlert(`Please set both minimum and maximum for ${attr}`, 'danger');
          return;
        }
      }
    }


    // Additional Validation: Either Lay or Back should be selected
    if (!data.betType) {
      displayAlert('Please select either Lay or Back', 'danger');
      return;
    }

    // Validation: Check if at least one country is selected
    if (!data.selectedCountries || data.selectedCountries.length === 0) {
      displayAlert('At least one country must be selected', 'danger');
      return;
    }

    // Validation: Check if at least one sport type is selected
    if (!data.selectedSportType || data.selectedSportType === "") {
      displayAlert('At least one sport type must be selected', 'danger');
      return;
    }

    // Additional Validation: Either Lay or Back should be selected
    if (data.betSize < 1) {
      displayAlert('Please select a bet size', 'danger');
      return;
    }

    // Additional Validation: A min and a max price need to be entered
    if (data.priceMinValue < 1 || data.priceMaxValue < 1) {
      displayAlert('Please enter both a minimum and a maximum price', 'danger');
      return;
    }

    // Log payload to the console

    // Make POST request to /save_strategy
    axios.post(
      `http://${API_URL}/save_strategy`,
      { strategy_config: data },
      {
        headers: {
          Authorization: `Bearer ${tokenRef.current}`
        }
      }
    )

      .then(response => {
        console.log("Response from server:", response.data);
        load_available_strategies();
        loadStrategy(data.StrategyName);
        displayAlert('Strategy successfully saved', 'success');
      })
      .catch(error => {
        console.error("Error saving strategy:", error);
        displayAlert('Failed to save strategy', 'danger');
      });
  };

  const load_available_strategies = () => {
    axios.post(
      `http://${API_URL}/get_strategies`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenRef.current}`
        }
      }
    )
      .then(res => {
        setAvailableStrategies(res.data.strategies || []);
        // console.log('Available Strategies:', res.data.strategies);
        setData(defaultAttributesConfig);
      })
      .catch(error => {
        console.error('Error fetching strategies:', error);
      });
  }


  useEffect(() => {
    load_available_strategies();
  }, []);



  const loadStrategy = (strat) => {
    const strategyToLoad = typeof strat === 'string' ? strat : selectedStrategy;
    setSelectedStrategy(strategyToLoad);
    console.log("Loading Strategy:", strategyToLoad);  // Debug log

    // Initialize data with defaultAttributesConfig
    setData(defaultAttributesConfig);

    axios.post(`http://${API_URL}/load_strategy`,
      { strategy_name: strategyToLoad },
      { headers: { Authorization: `Bearer ${tokenRef.current}` } }
    )

      .then(res => {
        // Merge the default attributes with the loaded strategy data
        const mergedData = { ...defaultAttributesConfig, ...res.data };

        // Update the state to re-render your component
        setData(mergedData);
      })
      .catch(error => {
        console.error('Error loading strategy:', error);
        displayAlert('Failed to load strategy', 'danger');
      });
  };

  const deleteStrategy = () => {
    if (window.confirm('Are you sure you want to delete this strategy?')) {
      setSelectedStrategy(selectedStrategy);

      axios.post(
        `http://${API_URL}/delete_strategy`, 
        { strategy_name: selectedStrategy },
        {
          headers: {
            Authorization: `Bearer ${tokenRef.current}`
          }
        }
      )
        .then(res => {
          setAvailableStrategies([]);
          load_available_strategies();
          displayAlert('Strategy successfully deleted', 'success');
        })
        .catch(error => {
          console.error('Error loading strategy:', error);
          displayAlert('Failed to load strategy', 'danger');
        });
    } else {
      displayAlert('Strategy deletion cancelled', 'warning');
    }
  };


  const handleChange = (attr: keyof IAttributesConfig, value: any) => {
    setData(prevConfig => ({ ...prevConfig, [attr]: value }));
  };

  // Render
  return (
    <div className="strategy-form">
      <h2>Strategy Editor</h2>

      {/* Load existing strategy */}
      <div className="selections-box">
        <label>Select Strategy:</label>
        <div className="selections">
          <select value={selectedStrategy} onChange={(e) => setSelectedStrategy(e.target.value)}>
            <option value="" disabled>Select a strategy</option> {/* This option is added */}
            {availableStrategies.map(strategy => (
              <option key={strategy} value={strategy}>{strategy}</option>
            ))}
          </select>
          <button onClick={loadStrategy}>Load</button>
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={deleteStrategy}>Del</button>
        </div>
      </div>


      {/* Strategy Name */}
      <div className="strategy-name">
        <label>Strategy Name:</label>
        <input type="text" value={data.StrategyName} onChange={(e) => handleChange('StrategyName', e.target.value)} />
      </div>

      {/* Price and min/max values */}
      <div className="selection-box d-flex">
        <label>Strategy status:</label>
        <div className="selections">
          <select value={data.active} onChange={(e) => handleChange('active', e.target.value)}>
            <option value="">Select</option>
            <option value="off">Deactivated</option>
            <option value="dummy">Dummy</option>
            <option value="on">Active</option>
          </select>
        </div>
      </div>

      {/* Country Selection */}
      <div className="country-selection">
        <label>Select Countries:</label>
        <select multiple value={data.selectedCountries} onChange={(e) => handleChange('selectedCountries', Array.from(e.target.selectedOptions, option => option.value))}>
          <option value="AU">Australia</option>
          <option value="NZ">New Zealand</option>
          <option value="GB">Great Britain</option>
          <option value="IE">Ireland</option>
          <option value="US">USA</option>
        </select>
      </div>

      {/* Sport Type Selection */}
      <label>Select Sport Type:</label>
      <div className="sport-type">
        <select value={data.selectedSportType} onChange={(e) => handleChange('selectedSportType', e.target.value)}>
          <option value="">Select</option>
          <option value="Horse Racing">Horse Racing</option>
          <option value="Greyhound Racing">Greyhound Racing</option>
        </select>
        <select value={data.harnessSelection} onChange={(e) => handleChange('harnessSelection', e.target.value)}>
          <option value="Any">Any</option>
          <option value="Harness only">Harness only</option>
          <option value="Non harness only">Non-harness only</option>
        </select>
      </div>

      {/* Bet Type */}
      <div className="selection-box centered">
        <label>Bet Type:</label>
        <div className="radio-boxes">
          <label>
            <input type="radio" value="Lay" checked={data.betType === "Lay"} onChange={() => handleChange('betType', "Lay")} />
            Lay
          </label>
          <label>
            <input type="radio" value="Back" checked={data.betType === "Back"} onChange={() => handleChange('betType', "Back")} />
            Back
          </label>
          <div className="selections">
            <select value={data.market_type} onChange={(e) => handleChange('market_type', e.target.value)}>
              <option value="WIN">WIN</option>
              <option value="PLACE">PLACE</option>
            </select>
          </div>
        </div>

      </div>



      {/* Bet Size */}
      <div className="bet-size">
        <label>Bet Size:</label>
        <input title="Bet size in $" type="number" value={data.betSize} onChange={(e) => handleChange('betSize', parseFloat(e.target.value))} />
      </div>

      {/* Price and min/max values */}
      <div className="selection-box d-flex">
        <label>Price:</label>
        <div className="selections">
          <select value={data.priceStrategy} onChange={(e) => handleChange('priceStrategy', e.target.value)}>
            <option value="back">Highest offered back by layer </option>
            <option value="last">Last traded</option>
            <option value="lay">Lowest offered lay by backer</option>
            <option value="_back_moving_avg">Back moving average</option>
            <option value="_lay_moving_avg">Lay moving average</option>
          </select>
          <input title="Minimum price in $" type="number" placeholder="Min" value={data.priceMinValue} onChange={(e) => handleChange('priceMinValue', e.target.value)} />
          <input title="Allowed maximum price in $" type="number" placeholder="Max" value={data.priceMaxValue} onChange={(e) => handleChange('priceMaxValue', e.target.value)} />
        </div>
      </div>


      {/* Multi horses */}
      <div className="selection-box d-flex">
        <label>Maximum different horses bet per race</label>
        <div className="selections">
          <input title="The amount of maximum horses that a bet is placed on for a single race" type="number" placeholder="Max" value={data.maxHorsesToBet} onChange={(e) => handleChange('maxHorsesToBet', e.target.value)} />

          <select value={data.maxHorsesToBetStrategy} onChange={(e) => handleChange('maxHorsesToBetStrategy', e.target.value)}>
            <option value="lowest odds first">Lowest odds first</option>
            <option value="highest odds first">Highest odds first</option>
          </select>
        </div>
      </div>






      <div className="timeSlider centered">
        <CustomSlider
          data={data}
          handleChange={handleChange}
          sliderName='secsToStartSlider'
          marks={[
            { value: -3600, label: '-3600s' },
            { value: 0, label: '0s' },
            { value: 600, label: '600s' }
          ]}
          min={-3600}
          max={600}
          title='Place bets in this time window relative to race start'
        />
      </div>




      <div>
        <ConditionsManager data={data} setData={setData} updateData={updateData} />
      </div>

      {/* Submit button */}
      <div className="submit-btn">
        <button onClick={saveStrategy}>Save Strategy</button> {/* Invoke saveStrategy when clicked */}
      </div>
    </div>
  );
}

export default Strategy;
