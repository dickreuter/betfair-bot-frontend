import React, { useState } from 'react';

const CountrySelector = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    setSelectedCountries(selectedOptions.map(option => option.value));
  };

  return (
    <select multiple={true} onChange={handleChange} value={selectedCountries}>
      <option value="AU">Australia</option>
      <option value="US">United States</option>
      <option value="UK">United Kingdom</option>
      <option value="IE">Ireland</option>
    </select>
  );
};

export default CountrySelector;
