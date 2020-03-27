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

export default class DecimalStep extends React.Component {
  state = {
    inputValue: 0,
  };

  onSliderChange = (value) => {
    const { updateSeconds } = this.props;
    updateSeconds(parseInt(value));
    this.setState({
      inputValue: value,
    });
  };

  onChange = (event) => {
    const { updateSeconds } = this.props;
    const { value } = event.target;
    if (parseInt(value) > 60) {
      this.setState({
        inputValue: 60,
      });
    } else {
      updateSeconds(Number(value));
      this.setState({
        inputValue: value,
      });
    }
  };

  render() {
    const { inputValue } = this.state;
    const { isCliked } = this.props;

    return (
      <div>
        <Slider
          disabled={isCliked}
          min={0}
          max={60}
          step={15}
          onChange={this.onSliderChange}
          value={inputValue}
        />
        <input
          className="custom-input"
          disabled={isCliked}
          min={0}
          max={60}
          step={15}
          type="number"
          value={inputValue}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
