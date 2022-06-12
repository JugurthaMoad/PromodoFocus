import { useState } from "react";
import { Stop } from "./logos";
interface ScreenProps {
  changeColor: (color_number: number) => void;
}
const active: number[] = [0, 1, 2];
const Screen = ({ changeColor }: ScreenProps) => {
  const [activeButton, setActiveButton] = useState(active[0]);
  const [stop, setStop] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const hundleClick = (color_number: number): void => {
    changeColor(color_number);
    setActiveButton(active[color_number]);
  };
  const hundleStart = (): void => {
    setStop(true);
  };
  const hundleStop = (): void => {
    console.log("stop");
    setStop(false);
    setShowAlert(true);
  };
  const hundleAlert_can = () => {
    console.log("cancel");
    setShowAlert(false);
  };
  const hundleAlert_ok = () => {
    console.log("ok");
    setShowAlert(false);
  };
  return (
    <div className="screen_container">
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
          <span className="time">25: 00</span>
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
