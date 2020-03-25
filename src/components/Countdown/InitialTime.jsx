import React from 'react';
import 'antd/dist/antd.css';
import { Slider, InputNumber } from 'antd';
import PropTypes from 'prop-types';

InputNumber.propTypes = {
  value: PropTypes.number.isRequired,
}

export class IntegerStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
    };
  }

  onSliderChange = (value) => {
    this.props.updateMinutes(value);
    this.setState({
      inputValue: value,
    });
  }

  onChange = (e) => {
    const { value } = e.target;
    if ( parseInt(value) > 720) {
      this.setState({
        inputValue: 720,
      });
    } else {
      this.props.updateMinutes(value);
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
            value={typeof inputValue === 'number' ? inputValue : 0}
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

export class DecimalStep extends React.Component {
  state = {
    inputValue: 0,
  };

  onSliderChange = value => {
    this.props.updateSeconds(value);
    if (isNaN(value)) {
      return;
    }
    this.setState({
      inputValue: value,
    });
  };

  onChange = (e) => {
    const { value } = e.target;
    if ( parseInt(value) > 60) {
      this.setState({
        inputValue: 60,
      });
    } else {
      this.props.updateSeconds(value);
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
            value={typeof inputValue === 'number' ? inputValue : 0}
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