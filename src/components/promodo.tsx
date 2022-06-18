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
  const [work, setWork] = useState(25);
  const [shortBreak, setShort] = useState(5);
  const [longBreak, setLong] = useState(15);
  const [update, setUpdate] = useState(false);
  const choices: number[] = [work, shortBreak, longBreak];
  const [choice, setChoice] = useState(choices[0]);
  const [promodo, setPromodo] = useState(choice); // minuts for promodo
  const [time, setTime] = useState(promodo * 60);
  let min = Math.trunc(time / 60);
  let sec = time % 60;
  const [minuts, setMinuts] = useState(Math.trunc(time / 60));
  const [seconds, setSeconds] = useState(time % 60);
  const [stopTimer, setStopTimer] = useState(false);
  console.log("work = ", work);
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
  const changeWork = (time: number) => {
    changeActiveButton(0);
    setWork(time);
  };
  const changeShort = (time: number) => {
    setShort(time);
  };
  const changeLong = (time: number) => {
    setLong(time);
  };
  useEffect(() => {
    document.documentElement.style.setProperty("--color_background", color);
    setPromodo(choice);
    setTime(promodo * 60);
    setMinuts(time / 60);
    setSeconds(time % 60);
  }, [activeButton, color, choice, promodo, time]);
  return (
    <div id="promo" className="promo_container">
      <div className="promo_sub_container">
        <NavBar
          title="Coucou navbar"
          setWork={changeWork}
          setShort={changeShort}
          setLong={changeLong}
        />
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
