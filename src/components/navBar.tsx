import { useState, useRef } from "react";
import { Logo, Login, Setting, Report } from "./logos";
interface NavProps {
  title: string;
  setWork: (time: number) => void;
  setShort: (time: number) => void;
  setLong: (time: number) => void;
}

const NavBar = ({ title, setWork, setShort, setLong }: NavProps) => {
  const [setting, showSetting] = useState(false);
  const [setting_btn, setSetting_btn] = useState(false);
  const inputRef1 = useRef<any>(null);
  const inputRef2 = useRef<any>(null);
  const inputRef3 = useRef<any>(null);
  const hundleSetting = () => {
    showSetting(true);
  };
  const hundleCloseSetting = () => {
    inputRef1.current.value = "";
    inputRef2.current.value = "";
    inputRef3.current.value = "";
    showSetting(false);
  };
  const hundleClickSetting = () => {
    console.log("");
  };
  const hundleChange = () => {
    console.log("seting = ", setting_btn);
    if (
      inputRef1.current.value === "" ||
      inputRef2.current.value === "" ||
      inputRef3.current.value === ""
    ) {
      setSetting_btn(false);
    } else {
      setSetting_btn(true);
    }
  };

  const hundleOk = () => {
    console.log("value = ", inputRef1.current.value);
    setWork(inputRef1.current.value);
    setShort(inputRef2.current.value);
    setLong(inputRef3.current.value);
    hundleCloseSetting();
  };
  return (
    <div className="navbar_container">
      <div className="logo">
        <Logo />
        Promofocus
      </div>
      <div className="subnav_container">
        <div className="i_container">
          <Report />
          <span className="i_text">Report</span>
        </div>
        <div className="setting_container">
          <div onClick={hundleSetting} className="i_container">
            <Setting />
            <span className="i_text">Setting</span>
          </div>
          <div className={setting ? "setting_sub_container" : "hide"}>
            <div className="setting_menu">
              <span>Timer Setting</span>
              <span className="setting_close" onClick={hundleCloseSetting}>
                X
              </span>
            </div>
            <div className="setting_options">
              Promodoro
              <input
                ref={inputRef1}
                onChange={hundleChange}
                type="number"
                min="2 "
              />
            </div>
            <div className="setting_options">
              Short Break
              <input
                ref={inputRef2}
                onChange={hundleChange}
                type="number"
                min="3 "
              />
            </div>
            <div className="setting_options">
              Long Break
              <input
                ref={inputRef3}
                onChange={hundleChange}
                type="number"
                min="5"
              />
            </div>
            <span
              onClick={setting_btn ? hundleOk : () => {}}
              className={setting_btn ? "setting_btn" : "setting_btn_dis"}
            >
              Ok
            </span>
          </div>
        </div>

        <div className="i_container">
          <Login />
          <span className="i_text">Login</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
