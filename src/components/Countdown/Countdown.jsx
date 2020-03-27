/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import React from 'react';
import { Progress } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import IntegerStep from './IntegerStep';
import DecimalStep from './DecimalStep';

IntegerStep.propTypes = {
  isClicked: PropTypes.bool,
  updateMinutes: PropTypes.func,
};

DecimalStep.propTypes = {
	isClicked: PropTypes.bool,
	updateMinutes: PropTypes.func,
};

export default class Countdown extends React.Component {
	constructor(props) {
		super(props);
		this.wrapper = React.createRef();
		this.state = {
			minutes: 0,
			seconds: 0,
			isCliked: false,
			startTime: 0,
		};
	}

	updateMinutes = (value) => {
		this.setState({ minutes: value });
	}

	updateSeconds = (value) => {
		this.setState({ seconds: value });
	}

	resetTimer = () => {
		const { isCliked } = this.state;
		if (isCliked) {
			clearInterval(this.secondsTimer);
			this.setState({ isCliked: false });
		} else {
			this.setState({ minutes: 0, seconds: 0, startTime: 0 });
		}
	}

	handleStopCountdown = () => {
		this.setState({ isCliked: false });
		clearInterval(this.secondsTimer);
	}

	handleCountdown = () => {
		const { minutes, seconds } = this.state;
		this.setState({
			isCliked: true,
			startTime: Number(`${minutes}.${seconds > 0 ? Math.round((seconds / 3) * 5) : 0}`),
		});

		const decrementSeconds = () => {
			const { seconds, minutes } = this.state;
			this.setState({ seconds: seconds - 1 });
			if (seconds === 0) {
				if (minutes === 0) {
					this.audio = document.getElementById('audio');
					this.audio.load();
					this.playAudio();
					this.setState({ seconds, isCliked: false, startTime: 0 });
					return clearInterval(this.secondsTimer);
				}
				this.setState({ minutes: minutes - 1, seconds: 59 });
			}
		};
		this.secondsTimer = setInterval(decrementSeconds, 1000);
	}

	playAudio() {
		this.audio.play()
			.then((file) => {
				console.log(file);
			})
			.catch((err) => console.info(err));
	}

	render() {
		const {
			startTime,
			minutes,
			seconds,
			isCliked,
		} = this.state;
		const value = isCliked ? 'Остановить' : 'Запустить';
		const zero = (num) => (num < 10 ? 0 : '');
		// Time percent calculation
		const secondsToPercent = seconds > 0 ? (seconds / 3) * 5 : 0;
		const remainingMinute = Number(`${minutes}.${zero(secondsToPercent)}${secondsToPercent.toFixed()}`);
		const difference = (startTime - (startTime - remainingMinute));
		const percent = Math.round(100 - (difference / startTime) * 100);

		const classList = cn({
			red: isCliked,
			start: true,
		});

		return (
  <div ref={this.wrapper}>
    <IntegerStep isCliked={isCliked} updateMinutes={this.updateMinutes} />
    <DecimalStep isCliked={isCliked} updateSeconds={this.updateSeconds} />
    <h1 className="timer">{`${zero(minutes)}${minutes} : ${zero(seconds)}${seconds}`}</h1>
    <div className="progress">
      <Progress
        type="circle"
        strokeColor={{
					'0%': '#108ee9',
					'100%': '#87d068',
				}}
        percent={percent}
      />
    </div>
    <button type="button" className={classList} onClick={isCliked ? this.handleStopCountdown : this.handleCountdown}>
      {value}
    </button>
    <button type="button" className="reset" onClick={this.resetTimer}>
      Сбросить
    </button>
    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    <audio id="audio" preload="auto" src="timer.mp3" />
  </div>
		);
	}
}
