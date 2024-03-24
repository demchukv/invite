import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { useAuth } from "../../hooks";

export const AppHead = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="navbar-fixed">
      <nav className="blue-grey">
        <div className="nav-wrapper">
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </nav>
    </div>
  );
};
