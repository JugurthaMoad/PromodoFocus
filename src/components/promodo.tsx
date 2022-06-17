import { useState, useEffect } from "react";
import NavBar from "./navBar";
import Screen from "./screen";
const Promodo = () => {
  const colors: string[] = [
    "rgb(217, 85, 80)",
    "rgb(76, 145, 149)",
    "rgb(69, 124, 163)",
  ];
  const options: number[] = [0, 1, 2]; // promo short long break
  const active: number[] = [0, 1, 2]; // the list of buttons
  const [option, setOption] = useState(options[0]);
  const [color, setColor] = useState(colors[0]);
  const [activeButton, setActiveButton] = useState(active[0]);
  const [work, setWork] = useState(2);
  const [shortBreak, setShort] = useState(1);
  const [longBreak, setLong] = useState(2);
  const choices: number[] = [work, shortBreak, longBreak];
  const [choice, setChoice] = useState(choices[0]);
  const [promodo, setPromodo] = useState(choice); // minuts for promodo
  const [time, setTime] = useState(promodo * 60);
  let min = Math.trunc(time / 60);
  let sec = time % 60;
  const [minuts, setMinuts] = useState(Math.trunc(time / 60));
  const [seconds, setSeconds] = useState(time % 60);
  const [stopTimer, setStopTimer] = useState(false);
  const changeColor = (color_number: number) => {
    setColor(colors[color_number]);
  };
  const changeActiveButton = (button_number: number) => {
    setActiveButton(active[button_number]);
  };
  const hundleOption = (option_number: number) => {
    changeColor(option_number);
    setOption(options[option_number]);
    changeActiveButton(option_number);
    setChoice(choices[option_number]);
  };
  const hundleStopTimer = (stop: boolean) => {
    setStopTimer(stop);
  };
  useEffect(() => {
    document.documentElement.style.setProperty("--color_background", color);
    setPromodo(choice);
    setTime(promodo * 60);
    setMinuts(time / 60);
    setSeconds(time % 60);
    console.log("promodo = ", promodo);
  }, [activeButton, color, choice, promodo, time, stopTimer]);
  return (
    <div id="promo" className="promo_container">
      <div className="promo_sub_container">
        <NavBar title="Coucou navbar" />
        <Screen
          hundleOption={hundleOption}
          option={option}
          activeButton={activeButton}
          promodo={promodo}
        />
      </div>
    </div>
  );
};

export default Promodo;
