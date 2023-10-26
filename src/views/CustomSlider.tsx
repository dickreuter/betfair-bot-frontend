import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CustomSlider = ({ data, handleChange, sliderName, marks, min, max, title}) => {
    const [value, setValue] = useState([-3600, 600]);

    useEffect(() => {
      if (data[sliderName] && data[sliderName].length === 2) {
          setValue(data[sliderName]);
      }
  }, [data, sliderName]);
  

    const handleInputChange = (index, event) => {
      const newVal = [...value];
      newVal[index] = Number(event.target.value) || 0;
      setValue(newVal);
      handleChange(sliderName, newVal);
    };

    return (
      <Box sx={{ width: 500 }}>
        <Typography id="range-slider" gutterBottom>
          {title}
        </Typography>
        <Slider
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue as [number, number]);
            handleChange(sliderName, newValue);
          }}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={min}
          max={max}
          marks={marks}
        />
        <div>
          From: 
          <input 
            type="number"
            value={value[0]}
            onChange={(e) => handleInputChange(0, e)}
          />
         to 
          <input 
            type="number"
            value={value[1]}
            onChange={(e) => handleInputChange(1, e)}
          />
          
        </div>
      </Box>
    );
}

export default CustomSlider;
