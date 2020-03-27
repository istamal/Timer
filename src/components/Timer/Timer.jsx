import React from 'react';
import 'antd/dist/antd.css';
import cn from 'classnames';

export class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0,
			},
			isCliked: false,
			stop: false,
		}
	}

	stopTimer = () => {
		clearInterval(this.milisecondsCounter);
		const { isCliked } = this.state;
		this.setState({ isCliked: !isCliked });
	}

	startTimer = () => {
		const { isCliked } = this.state;
		this.setState({ isCliked: !isCliked });

		const increment = () => {
			const { minutes, seconds, miliseconds } = this.state.time;
			if (miliseconds === 60) {
				this.setState({ time: { minutes, seconds: seconds + 1, miliseconds: 0 } });
			} else if (seconds === 60) {
				this.setState({ time: { minutes: minutes + 1, seconds: 0, miliseconds } });
			} else {
				this.setState({ time: { minutes, seconds, miliseconds: miliseconds + 1 } });
			}
		}

		this.milisecondsCounter = setInterval(increment, 15);
	}

	clearProgress = () => {
		const { isCliked } = this.state;
		if (isCliked) {
			clearInterval(this.milisecondsCounter);
			this.setState({ isCliked: false });
		} else {
			this.setState({ time: { minutes: 0, seconds: 0, miliseconds: 0 } });
		}
	}

	render() {
		const { isCliked } = this.state;
		const value = isCliked ? 'Пауза' : 'Запустить';
		const { minutes, seconds, miliseconds } = this.state.time;
		const zero = (num) => num < 10 ? 0 : '';
		const classList = cn({
			'red': isCliked,
			'start': true,
		});

		return (
			<div>
				<h1 className="timer">
					{`${zero(minutes)}${minutes} : ${zero(seconds)}${seconds} : ${zero(miliseconds)}${miliseconds}`}
				</h1>
				<button
					className={classList}
					onClick={ isCliked ? this.stopTimer : this.startTimer }
				>
					{ value }
				</button>
				<button
					className="reset"
					onClick={this.clearProgress}
				>
					Сбросить
				</button>
			</div>
		);
	}
};