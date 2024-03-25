import { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";


const Navigation = () => {

  useEffect(()=>{
    const elem = document.querySelector("#slide-out");
    M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250,
            closeOnClick: true,
            draggable: true
        });
  }, []);
  
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

      <ul id="slide-out" className="sidenav">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
      <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large">
        <i className="material-icons">menu</i>
      </a>
    </>
  );
};

export default Navigation;
