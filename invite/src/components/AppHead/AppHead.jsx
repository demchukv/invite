import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { useAuth } from "../../hooks";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export const AppHead = () => {
  
  const { isLoggedIn } = useAuth();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{flexWrap:"wrap"}}>
            <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
