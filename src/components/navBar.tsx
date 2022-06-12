import { Logo, Login, Setting, Report } from "./logos";
interface NavProps {
  title: string;
}

const NavBar = ({ title }: NavProps) => {
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
        <div className="i_container">
          <Setting />
          <span className="i_text">Setting</span>
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
