import React from 'react';
import { Progress } from 'antd';
import cn from 'classnames';
import IntegerStep from './IntegerStep';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isCountdownStarted: false,
      startTime: 0,
      time: 0,
    };
    this.timer = 0;
    this.counter = 0;
  }

  handleSecondsInput = (event) => {
    const { value } = event.target;
    const minutes = this.ref.current.value;
    const time = minutes * 60 + +value;
    if (+value <= 720 * 60) {
      this.setState({ time, startTime: time });
    }
  };

  handleMinutesSlider = (value) => {
    this.setState({ time: value, startTime: value });
  };

  handleMinutesInput = (event) => {
    const { value } = event.target;
    if (Number(value) <= 720) {
      this.setState({ time: value * 60, startTime: value * 60 });
    }
  };

  startCountdown = () => {
    this.setState({
      isCountdownStarted: true,
    });

    this.timer = setInterval(this.countDown, 1000);
  };

  stopCountdown = () => {
    clearInterval(this.timer);
    this.setState({ isCountdownStarted: false });
  };

  resetCountdown = () => {
    const { isCountdownStarted } = this.state;
    if (isCountdownStarted) {
      clearInterval(this.timer);
      this.setState({ isCountdownStarted: false });
    } else {
      this.setState({
        startTime: 0,
        time: 0,
      });
    }
  };

  countDown = () => {
    const { time } = this.state;
    this.setState({ time: time - 1 });
    if (time === 0) {
      this.audio = document.getElementById('audio');
      this.audio.load();
      this.playAudio();
      clearInterval(this.timer);
      this.setState({ isCountdownStarted: false, time: 0 });
    }
  };

  playAudio() {
    this.audio
      .play()
      .then(() => {})
      .catch((err) => err);
  }

  render() {
    const { startTime, isCountdownStarted, time } = this.state;

    const value = isCountdownStarted ? 'Остановить' : 'Запустить';
    const zero = (num) => (num < 10 ? 0 : '');

    const userSeconds = time % 60;
    const userMinutes = (time - userSeconds) / 60;
    const timeLeft = startTime - time;
    const percent = Math.round((timeLeft / startTime) * 100);

    const classList = cn({
      red: isCountdownStarted,
      start: true,
    });

    return (
      <div ref={this.wrapper}>
        <IntegerStep
          ref={this.ref}
          time={time}
          isCountdownStarted={isCountdownStarted}
          minutes={Math.floor(time / 60)}
          seconds={time % 60}
          inputRef={this.inputRef}
          handleSlider={this.handleMinutesSlider}
          handleInput={this.handleMinutesInput}
          handleInputSeconds={this.handleSecondsInput}
        />
        <h1 className="timer">
          {`${zero(userMinutes)}${userMinutes} : ${zero(userSeconds)}${userSeconds}`}
        </h1>
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
        <button
          type="button"
          className={classList}
          onClick={isCountdownStarted ? this.stopCountdown : this.startCountdown}
        >
          {value}
        </button>
        <button type="button" className="reset" onClick={this.resetCountdown}>
          Сбросить
        </button>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio id="audio" preload="auto" src="timer.mp3" />
      </div>
    );
  }
}
