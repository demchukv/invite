import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useAuth } from '../../hooks';
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Box sx={{display:"flex", gap:"36px", alignItems:"center"}}>
      <Typography>Welcome, {user.name}</Typography>
      <Button variant='contained' type="button" onClick={() => dispatch(logOut())} endIcon={<LogoutIcon />}>
        Logout
      </Button>
    </Box>
  );
};

export default UserMenu;