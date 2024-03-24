import { Link } from "react-router-dom";

const AuthNav = () => {
  return (
    <ul  id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to={"/register"}>
        Register
      </Link>
      </li>
      <li>
      <Link to={"/login"}>
        Log In
      </Link>
      </li>
    </ul>
  );
};

export default AuthNav;
