import React from 'react';
import 'antd/dist/antd.css';
import { Slider } from 'antd';
import PropTypes from 'prop-types';

const IntegerStep = React.forwardRef((props, ref) => {
  const {
    isCountdownStarted,
    handleSlider,
    handleInput,
    minutes,
    seconds,
    time,
    handleInputSeconds,
  } = props;

  return (
    <div>
      <Slider
        disabled={isCountdownStarted}
        min={0}
        step={15}
        max={720 * 60}
        onChange={handleSlider}
        value={time}
      />
      <input
        className="custom-input"
        disabled={isCountdownStarted}
        min={0}
        ref={ref}
        max={720}
        type="number"
        value={minutes}
        onChange={handleInput}
      />
      <input
        className="custom-input"
        disabled={isCountdownStarted}
        min={0}
        step={15}
        max={720 * 60}
        type="number"
        value={seconds}
        onChange={handleInputSeconds}
      />
    </div>
  );
});

IntegerStep.propTypes = {
  time: PropTypes.number.isRequired,
  isCountdownStarted: PropTypes.bool.isRequired,
  handleSlider: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  handleInputSeconds: PropTypes.func.isRequired,
};

export default IntegerStep;
