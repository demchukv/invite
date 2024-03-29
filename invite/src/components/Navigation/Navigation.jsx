import { Link as RouterLink } from 'react-router-dom';
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const Navigation = () => {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <MenuItem component={RouterLink} to={"/"} sx={{ py: "6px", px: "12px" }}>
        <Typography variant="body2" color="text.primary">
          Home
        </Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to={"/about"} sx={{ py: "6px", px: "12px" }}>
        <Typography variant="body2" color="text.primary">
          About
        </Typography>
      </MenuItem>
    </Box>
  );
};

export default Navigation;
