import React from 'react';
import 'antd/dist/antd.css';
import { Slider } from 'antd';
import PropTypes from 'prop-types';

const DecimalStep = (props) => {
  const {
    isCountdownStarted, handleSlider, handleInput, seconds,
  } = props;

  return (
    <div>
      <Slider
        disabled={isCountdownStarted}
        min={0}
        max={43200}
        step={15}
        onChange={handleSlider}
        value={seconds}
      />
      <input
        className="custom-input"
        disabled={isCountdownStarted}
        min={0}
        max={43200}
        step={15}
        type="number"
        value={seconds}
        onChange={handleInput}
      />
    </div>
  );
};

DecimalStep.propTypes = {
  isCountdownStarted: PropTypes.bool.isRequired,
  handleSlider: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default DecimalStep;
