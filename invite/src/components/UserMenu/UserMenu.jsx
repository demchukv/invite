import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { useAuth } from "../../hooks";
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const UserMenu = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <>
      <MenuItem sx={{ py: "6px", px: "12px" }}>
        <Typography variant="body2" color="text.primary">
          Welcome, {user.name}
        </Typography>
      </MenuItem>
      <MenuItem sx={{ py: "6px", px: "12px" }} component={RouterLink} to={"/invites"} onClick={()=>setOpen(false)}>
          <Typography variant="body2" color="text.primary">
            Invitation
          </Typography>
      </MenuItem>
      <Button
        color="primary"
        variant="contained"
        size="small"
        component="button"
        onClick={() => {dispatch(logOut()); setOpen(false);}}
      >
        Logout
      </Button>
    </>
  );
};

export default UserMenu;
