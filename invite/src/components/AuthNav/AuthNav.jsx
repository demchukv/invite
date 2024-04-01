import { Link as RouterLink } from 'react-router-dom';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const AuthNav = ({ setOpen }) => {
  return (
    <>
      <MenuItem sx={{ py: "6px", px: "12px" }} component={RouterLink} to={"/login"} onClick={()=>setOpen(false)}>
          <Typography variant="body2" color="text.primary">
            Вхід
          </Typography>
      </MenuItem>
      <MenuItem sx={{ py: "6px", px: "12px" }} component={RouterLink} to={"/register"} onClick={()=>setOpen(false)}>
          <Typography variant="body2" color="text.primary">
            Реєстрація
          </Typography>
      </MenuItem>
    </>
  );
};

export default AuthNav;
