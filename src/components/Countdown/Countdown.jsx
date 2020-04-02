/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import React from 'react';
import { Progress } from 'antd';
import cn from 'classnames';
import IntegerStep from './IntegerStep';
import DecimalStep from './DecimalStep';

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      isCliked: false,
      startTime: 0,
      time: 0,
    };
    this.timer = 0;
  }

  resetTimer = () => {
    const { isCliked } = this.state;
    if (isCliked) {
      clearInterval(this.timer);
      this.setState({ isCliked: false });
    } else {
      this.setState({
        startTime: 0,
        time: 0,
      });
    }
  };

  handleSecondsSlider = value => {
    const { time } = this.state;
    console.log(value);
    if (+value <= 60) {
      this.setState({ time: time + +value, startTime: time + +value });
    }
  };

  handleMinutesSlider = value => {
    this.setState({ time: value * 60, startTime: value * 60 });
  };

  handleSecondsInput = event => {
    const { value } = event.target;
    const { time } = this.state;
    if (+value <= 45) {
      this.setState({ time: time + +value, startTime: time + +value });
    }
  };

  handleMinutesInput = event => {
    const { value } = event.target;
    if (Number(value) <= 720) {
      this.setState({ time: value * 60, startTime: value * 60 });
    }
  };

  handleStopCountdown = () => {
    clearInterval(this.timer);
    this.setState({ isCliked: false });
  };

  handleCountdown = () => {
    this.setState({
      isCliked: true,
    });

    this.timer = setInterval(this.countDown, 1000);
  };

  countDown = () => {
    const { time } = this.state;
    this.setState({ time: time - 1 });
    if (time === 0) {
      this.audio = document.getElementById('audio');
      this.audio.load();
      this.playAudio();
      clearInterval(this.timer);
      this.setState({ isCliked: false, startTime: 0, time: 0 });
    }
  };

  playAudio() {
    this.audio
      .play()
      .then(file => {
        console.log(file);
      })
      .catch(err => console.info(err));
  }

  render() {
    const { startTime, isCliked, time } = this.state;

    const value = isCliked ? 'Остановить' : 'Запустить';
    const zero = num => (num < 10 ? 0 : '');

    const userSeconds = time % 60;
    const userMinutes = (time - userSeconds) / 60;
    const timeLeft = startTime - time;
    const percent = Math.round((timeLeft / startTime) * 100);

    const classList = cn({
      red: isCliked,
      start: true,
    });

    return (
      <div ref={this.wrapper}>
        <IntegerStep
          isCliked={isCliked}
          minutes={Math.floor(time / 60)}
          handleSlider={this.handleMinutesSlider}
          handleInput={this.handleMinutesInput}
        />
        <DecimalStep
          isCliked={isCliked}
          seconds={time % 60}
          handleSlider={this.handleSecondsSlider}
          handleInput={this.handleSecondsInput}
        />
        <h1 className="timer">{`${zero(userMinutes)}${userMinutes} : ${zero(
          userSeconds,
        )}${userSeconds}`}</h1>
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
          onClick={isCliked ? this.handleStopCountdown : this.handleCountdown}
        >
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
