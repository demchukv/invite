import { Link as RouterLink } from 'react-router-dom';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const NavigationDrawer = ({ setOpen }) => {
  return (
    <>
      <MenuItem sx={{ py: "6px", px: "12px" }} component={RouterLink} to={"/"} onClick={()=>setOpen(false)}>
          <Typography variant="body2" color="text.primary">
            Home
          </Typography>
      </MenuItem>
      <MenuItem sx={{ py: "6px", px: "12px" }} component={RouterLink} to={"/about"} onClick={()=>setOpen(false)}>
          <Typography variant="body2" color="text.primary">
            About
          </Typography>
      </MenuItem>
    </>
  );
};

export default NavigationDrawer;
