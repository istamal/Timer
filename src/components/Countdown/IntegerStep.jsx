/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React from 'react';
import 'antd/dist/antd.css';
import { Slider } from 'antd';

const IntegerStep = (props) => {
  const {
    isCliked,
    handleSlider,
    handleInput,
    minutes,
  } = props;

  return (
    <div>
      <Slider
        disabled={isCliked}
        min={0}
        max={720}
        onChange={handleSlider}
        value={minutes}
      />
      <input
        className="custom-input"
        disabled={isCliked}
        min={0}
        max={720}
        type="number"
        value={minutes}
        onChange={handleInput}
      />
    </div>
  );
};

export default IntegerStep;
