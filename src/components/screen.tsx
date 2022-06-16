import { useState, useEffect, useRef } from "react";
import { Stop } from "./logos";
import Tasks from "./tasks";
let path = "test2.mp3";
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
  const [changeAlert, setChangeAlert] = useState(false);
  const [finishAlert, setFinish] = useState(false);
  const [timer, setTimer] = useState<number>(promodo * 60);
  const temps = useRef<number>(timer);
  let min = Math.trunc(timer / 60);
  let sec = timer % 60;
  let paused = useRef(true);
  let param = useRef<any>(null);
  let date_start = useRef<number>(0);
  let interval_id = useRef<any>(0);
  let text = useRef<any>("");
  let audio = useRef(new Audio(path));
  const [minuts, setMinuts] = useState(min);
  const [seconds, setSeconds] = useState(sec);
  const [widthTimer, setWidth] = useState<number>(date_start.current);
  let style = {
    width: widthTimer + "px",
  };
  const hundleClick = (color_number: number): void => {
    if (temps.current - timer === 0) {
      hundleOption(color_number);
    } else {
      param.current = color_number;
      setChangeAlert(true);
      paused.current = true;
      startCount();
    }
  };
  const hundleFinish = () => {
    setFinish(!finishAlert);
  };
  const hundleAlertFinish = () => {
    hundleFinish();
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
  const hundleChange_ok = () => {
    if (param.current !== null) {
      paused.current = true;
      hundleOption(param.current);
      param.current = null;
      setChangeAlert(false);
      startCount();
    }
  };
  const hundleChange_can = () => {
    if (param.current) {
      paused.current = false;
      param.current = null;
      setChangeAlert(false);
      startCount();
    }
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
    date_start.current += 400 / timer;

    setWidth(date_start.current);
    hundleTime(min, sec);

    if (min <= 0 && sec <= 0) {
      audio.current.play();
      date_start.current = 0;

      clearInterval(interval_id.current);
      if (option !== 0) {
        hundleOption(0);
        text.current = "Time to work";
        hundleAlertFinish();
      } else {
        hundleOption(1);
        text.current = "time te take a break";
        hundleAlertFinish();
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
    date_start.current = 0;
    setWidth(date_start.current);
    setStop(false);
    clearInterval(interval_id.current);
  }, [promodo, timer]);
  return (
    <div className="screen_container">
      <div className="promo_timer">
        <div className="promo_sub_timer" style={style}></div>
      </div>
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

      <Tasks option={option} />

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
      <div className={changeAlert ? " alert_container" : "hide"}>
        <div className="alert">
          <p>The timer is still running, are you sure you want to switch?</p>
          <div className="alert_buttons_container">
            <span onClick={hundleChange_can} className="alert_button_can">
              Annuler
            </span>
            <span onClick={hundleChange_ok} className="alert_button_ok">
              Ok
            </span>
          </div>
        </div>
      </div>
      <div className={finishAlert ? " alert_container" : "hide"}>
        <div className="alert">
          coucou
          <p>{text.current}</p>
          <span onClick={hundleFinish} className="alert_button_ok">
            Ok
          </span>
        </div>
      </div>
    </div>
  );
};

export default Screen;
