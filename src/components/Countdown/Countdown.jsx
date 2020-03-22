import React from 'react';
import { IntegerStep, DecimalStep } from './InitialTime';
import PropTypes from 'prop-types';
import cn from 'classnames';

IntegerStep.propTypes = {
	isClicked: PropTypes.bool,
	updateMinutes: PropTypes.func,
}

DecimalStep.propTypes = {
	isClicked: PropTypes.bool,
	updateMinutes: PropTypes.func,
}

export class Countdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minutes: 0,
			seconds: 0,
			isCliked: false,
		}
	}

	updateMinutes = (value) => {
		this.setState({ minutes: value });
	}

	updateSeconds = (value) => {
		this.setState({ seconds: value });
	}

	resetTimer =  () => {
		const { isCliked } = this.state;
		if (isCliked) {
			clearInterval(this.minutesTimer);
			clearInterval(this.secondsTimer);
			this.setState({ isCliked: false });
		} else {
			this.setState({ minutes: 0, seconds: 0 });
		}
	}

	handleStopCountdown = () => {
		this.setState({isCliked: false});
		clearInterval(this.minutesTimer);
		clearInterval(this.secondsTimer);
	}

	playAudio() {
		this.audio.play()
			.then((file) => {
				console.log(file);
			})
			.catch((err) => console.info(err));
	}

	handleCountdown = () => {
		this.setState({isCliked: true});

		const decrementSeconds = () => {
			const { seconds, minutes } = this.state;
			this.setState({ seconds: seconds - 1});
			if (seconds === 0) {
				if (minutes === 0) {
					this.setState({ seconds, isCliked: false });
					this.audio = document.getElementById('audio');
					this.audio.load();
					this.playAudio();
					return clearInterval(this.secondsTimer);
				}
				this.setState({ minutes: minutes - 1, seconds: 60 });
			}
		}
		this.secondsTimer = setInterval(decrementSeconds , 1000);
	}

	render() {
		const { minutes, seconds, isCliked } = this.state;
		const value = isCliked ? 'Остановить' : 'Запустить';
		const zero = (num) => num < 10 ? 0 : '';
		const classList = cn({
			'red': isCliked,
			'start': true,
		});

		return (
			<div>
				<IntegerStep isCliked={isCliked} updateMinutes={this.updateMinutes}/>
				<DecimalStep isCliked={isCliked} updateSeconds={this.updateSeconds}/>
				<h1 className="timer">{`${zero(minutes)}${minutes} : ${zero(seconds)}${seconds}`}</h1>
				<button className={classList} onClick={isCliked ? this.handleStopCountdown : this.handleCountdown}>
					{value}
				</button>
				<button className="reset" onClick={this.resetTimer}>
					Сбросить
				</button>
				<audio id="audio" preload="auto" src="timer.mp3"></audio>
			</div>
		);
	}
}