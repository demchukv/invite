import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <ul className="left hide-on-med-and-down">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
      <ul id="nav-mobile-left" className="sidenav">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
      <a href="#" data-target="nav-mobile-left" className="sidenav-trigger">
        <i className="material-icons">menu</i>
      </a>
    </>
  );
};

export default Navigation;
