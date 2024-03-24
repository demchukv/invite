import { NavLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

const AuthNav = () => {
  return (
    <Box sx={{display:"flex", gap:"36px"}}>
      <Link
        component={NavLink}
        to={"/register"}
        color="inherit"
        underline="none"
        variant="h6"
      >
        Register
      </Link>
      <Link
        component={NavLink}
        to={"/login"}
        color="inherit"
        underline="none"
        variant="h6"
      >
        Log In
      </Link>
    </Box>
  );
};

export default AuthNav;
