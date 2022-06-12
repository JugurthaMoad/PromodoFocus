import { useState, useEffect } from "react";
import NavBar from "./navBar";
import Screen from "./screen";
const Promodo = () => {
  const colors: string[] = [
    "rgb(217, 85, 80)",
    "rgb(76, 145, 149)",
    "rgb(69, 124, 163)",
  ];

  const [color, setColor] = useState(colors[0]);
  const changeColor = (color_number: number) => {
    console.log("cliuck");
    setColor(colors[color_number]);
  };

  useEffect(() => {
    console.log("useEffect");

    document.documentElement.style.setProperty("--color_background", color);
  }, [color]);
  return (
    <div id="promo" className="promo_container">
      <div className="promo_sub_container">
        <NavBar title="Coucou navbar" />
        <Screen changeColor={changeColor} />
      </div>
    </div>
  );
};

export default Promodo;
