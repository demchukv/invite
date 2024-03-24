import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";
import Link from "@mui/material/Link";
import MenuList from '@mui/material/MenuList';

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <MenuList open sx={{flexGrow: 1, display:"flex", gap:"36px"}}>
      <Link
        component={NavLink}
        to={"/"}
        color="inherit"
        underline="none"
        variant="h6"
      >
        Home
      </Link>
      {isLoggedIn && (
        <Link
          component={NavLink}
          to={"/contacts"}
          color="inherit"
          underline="none"
          variant="h6"
        >
          Phonebook
        </Link>
      )}
    </MenuList>
  );
};

export default Navigation;
