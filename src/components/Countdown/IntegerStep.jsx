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

export default class IntegerStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
    };
  }

  onSliderChange = (value) => {
    const { updateMinutes } = this.props;
    updateMinutes(parseInt(value));
    this.setState({
      inputValue: value,
    });
  }

  onChange = (event) => {
    const { value } = event.target;
    const { updateMinutes } = this.props;
    if (parseInt(value) > 720) {
      this.setState({
        inputValue: 720,
      });
    } else {
      updateMinutes(Number(value));
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
          max={720}
          onChange={this.onSliderChange}
          value={inputValue}
        />
        <input
          className="custom-input"
          disabled={isCliked}
          min={0}
          max={720}
          type="number"
          required
          value={inputValue}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
