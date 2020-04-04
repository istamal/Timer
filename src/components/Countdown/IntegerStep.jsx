import React from 'react';
import 'antd/dist/antd.css';
import { Slider } from 'antd';
import PropTypes from 'prop-types';

const IntegerStep = (props) => {
  const {
    isCountdownStarted, handleSlider, handleInput, minutes,
  } = props;

  return (
    <div>
      <Slider
        disabled={isCountdownStarted}
        min={0}
        max={720}
        onChange={handleSlider}
        value={minutes}
      />
      <input
        className="custom-input"
        disabled={isCountdownStarted}
        min={0}
        max={720}
        type="number"
        value={minutes}
        onChange={handleInput}
      />
    </div>
  );
};

IntegerStep.propTypes = {
  isCountdownStarted: PropTypes.bool.isRequired,
  handleSlider: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  minutes: PropTypes.number.isRequired,
};

export default IntegerStep;
