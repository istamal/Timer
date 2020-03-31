/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React from 'react';
import 'antd/dist/antd.css';
import { Slider, InputNumber } from 'antd';
import PropTypes from 'prop-types';

InputNumber.propTypes = {
  value: PropTypes.number.isRequired,
};

const DecimalStep = (props) => {
  const {
    isCliked,
    handleSlider,
    handleInput,
    seconds,
  } = props;

  return (
    <div>
      <Slider
        disabled={isCliked}
        min={0}
        max={60}
        step={15}
        onChange={handleSlider}
        value={seconds}
      />
      <input
        className="custom-input"
        disabled={isCliked}
        min={0}
        max={60}
        step={15}
        type="number"
        value={seconds}
        onChange={handleInput}
      />
    </div>
  );
};

export default DecimalStep;
