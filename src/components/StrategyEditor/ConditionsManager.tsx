import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { DATA_ATTRIBUTES } from '../../helper/Constants';
import '../../views/Strategy.css';


const ConditionsManager = ({ data, setData, updateData }) => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedDropDownValue, setSelectedDropDownValue] = useState('');

  const handleChange = (attr, value: any) => {
    setData(prevConfig => ({ ...prevConfig, [attr]: value }));
  };

  // Keep selectedAttributes in sync with data
  useEffect(() => {
    const attributes = Object.keys(data).filter(attr => DATA_ATTRIBUTES.includes(attr));
    setSelectedAttributes(attributes);
    console.log(data)
  }, [data]);


  const addAttribute = () => {
    if (selectedDropDownValue && !selectedAttributes.includes(selectedDropDownValue)) {
      // setSelectedAttributes([...selectedAttributes, selectedDropDownValue]);
      setData({ ...data, [selectedDropDownValue]: {} });
      console.log(data);
    }
  };



  const removeAttribute = (attr: string) => {
    // setSelectedAttributes(selectedAttributes.filter(a => a !== attr));
    const updatedAttributesConfig = { ...data };
    delete updatedAttributesConfig[attr];
    setData(updatedAttributesConfig);
  };

  return (
    <div className="container">
      <div className="row">
        <h3>Available conditions</h3>

        {/* Multi horses */}
        <div className="selection-box d-flex">
          <label>If missing data</label>
          <div className="selections">
            <select value={data.missingConditionsData} onChange={(e) => handleChange('missingConditionsData', e.target.value)}>
              <option value="risk">Risk it when no data is available for a condition and skip the condition</option>
              <option value="skip">Skip the bet if data is missing</option>
            </select>
          </div>
        </div>


        <div className="col-8">
          <div> {/* Container for select and icon */}
            <select id="attribute-dropdown" className="form-control" style={{ paddingRight: '24px' }} value={selectedDropDownValue} onChange={(e) => setSelectedDropDownValue(e.target.value)}>
              <option value="" disabled>Select attribute</option>
              {DATA_ATTRIBUTES.map(attr => (
                <option key={attr} value={attr}>{attr}</option>
              ))}
            </select>
            <div>
              <i className="fas fa-chevron-down"></i> {/* FontAwesome Down Arrow */}
            </div>
          </div>
        </div>
        <div className="col-4">
          <button className="btn btn-primary" onClick={addAttribute}>Add</button>
        </div>
      </div>
      <div>
        <h3>Selected Conditions</h3>
        <div>All the following elements need to be met for a bet to bet placed</div>
        <ul>
          {selectedAttributes.map(attr => (
            <li key={attr} className="row align-items-center">
              <div className="col-4">{attr}</div>
              <div className="col-3">
                Min: <input className="form-control" type="number" value={data[attr]?.min || ""} onChange={(e) => updateData(attr, e.target.value, data[attr]?.max)} />
              </div>
              <div className="col-3">
                Max: <input className="form-control" type="number" value={data[attr]?.max || ""} onChange={(e) => updateData(attr, data[attr]?.min, e.target.value)} />
              </div>
              <div className="col-2">
                <button className="btn btn-danger" onClick={() => removeAttribute(attr)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConditionsManager;
