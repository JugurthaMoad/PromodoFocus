import { exit } from "process";
import { useState, useEffect, useRef } from "react";
import { Stop } from "./logos";
interface ScreenProps {
  hundleOption: (option_number: number) => void;
  option: number;
  activeButton: number;
  promodo: number;
}
const Screen = ({
  hundleOption,
  option,
  activeButton,
  promodo,
}: ScreenProps) => {
  const [stop, setStop] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [timer, setTimer] = useState(promodo * 60);
  const temps = useRef(timer);
  let min = Math.trunc(timer / 60);
  let sec = timer % 60;
  let paused = useRef(true);
  let interval_id = useRef<any>(0);
  const [minuts, setMinuts] = useState(min);
  const [seconds, setSeconds] = useState(sec);

  const hundleClick = (color_number: number): void => {
    hundleOption(color_number);
  };

  const hundleStart = (): void => {
    if (stop === false) {
      paused.current = false;
      setStop(true);
      startCount();
    }
  };
  const hundleStop = (): void => {
    paused.current = true;
    setStop(false);
    setShowAlert(true);
    startCount();
  };
  const hundleAlert_can = () => {
    setShowAlert(false);

    paused.current = false;
    setStop(true);
    startCount();
  };

  const hundleAlert_ok = () => {
    paused.current = true;
    setStop(false);
    setShowAlert(false);
    if (option !== 0) {
      hundleOption(0);
    } else {
      hundleOption(1);
    }
    startCount();
  };
  const renderMinuts = () => {
    return <span>{minuts < 10 ? "0" + minuts : minuts}</span>;
  };
  const renderSeconds = () => {
    return <span>{seconds < 10 ? "0" + seconds : seconds}</span>;
  };
  const renderTimer = () => {
    return (
      <>
        <span>
          {renderMinuts()}:{renderSeconds()}
        </span>
      </>
    );
  };
  const hundleTime = (min: number, sec: number) => {
    setMinuts(min);
    setSeconds(sec);
  };

  const timerTest = () => {
    temps.current = temps.current <= 0 ? 0 : temps.current - 1;
    min = Math.trunc(temps.current / 60);
    sec = temps.current % 60;
    hundleTime(min, sec);
    if (min <= 0 && sec <= 0) {
      clearInterval(interval_id.current);
      if (option !== 0) {
        hundleOption(0);
      } else {
        hundleOption(1);
      }
    }
  };

  const startCount = () => {
    if (paused.current === false) {
      interval_id.current = setInterval(timerTest, 1000);
    } else {
      clearInterval(interval_id.current);
    }
  };

  useEffect(() => {
    setTimer(promodo * 60);
    setMinuts(Math.trunc(timer / 60));
    setSeconds(timer % 60);
    paused.current = true;
    temps.current = timer;
    setStop(false);
    clearInterval(interval_id.current);
  }, [promodo, timer]);
  return (
    <div className="screen_container">
      <div className="promo_timer"></div>
      <div className="counter_container">
        <div className="c_buttons_container">
          <div
            onClick={() => hundleClick(0)}
            className={
              activeButton === 0 ? "c_buttons c_buttons_active" : "c_buttons"
            }
          >
            Promodoro
          </div>
          <div
            onClick={() => hundleClick(1)}
            className={
              activeButton === 1 ? "c_buttons c_buttons_active" : "c_buttons"
            }
          >
            Short Break
          </div>
          <div
            onClick={() => hundleClick(2)}
            className={
              activeButton === 2 ? "c_buttons c_buttons_active" : "c_buttons"
            }
          >
            Long Break
          </div>
        </div>
        <div className="timer_container">
          <span className="time">{renderTimer()}</span>
        </div>
        <div className="screen_buttons">
          <span onClick={hundleStart} className="screen_button">
            START
          </span>
          <span
            onClick={hundleStop}
            className={stop ? "stop_button" : "stop_button hide_stop_button"}
          >
            {" "}
            <Stop />
          </span>
        </div>
      </div>
      <div className={showAlert ? " alert_container" : "hide"}>
        <div className="alert">
          <p>
            Are you sure you want to finish the round early? (The remaining time
            will not be counted in the report.)
          </p>
          <div className="alert_buttons_container">
            <span onClick={hundleAlert_can} className="alert_button_can">
              Annuler
            </span>
            <span onClick={hundleAlert_ok} className="alert_button_ok">
              Ok
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;
