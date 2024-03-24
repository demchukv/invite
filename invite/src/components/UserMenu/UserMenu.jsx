import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../hooks";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li>Welcome, {user.name}</li>
      <li>
        <Link to={"/contacts"}>Phonebook</Link>
      </li>
      <li>
        <button
          className="waves-effect waves-light btn"
          type="button"
          onClick={() => dispatch(logOut())}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};

export default UserMenu;
