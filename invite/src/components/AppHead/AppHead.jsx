import { useState } from 'react';
import PropTypes from 'prop-types';

import Navigation from "../Navigation/Navigation";
import NavigationDrawer from "../Navigation/NavigationDrawer";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { useAuth } from "../../hooks";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ToggleColorMode from "../ToggleColorMode/ToggleColorMode";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

export const AppHead = ({ mode, toggleColorMode }) => {
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const logoStyle = {
    width: "140px",
    height: "auto",
    cursor: "pointer",
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={
                  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                }
                style={logoStyle}
                alt="logo of sitemark"
              />

              <Navigation />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {isLoggedIn ? <UserMenu setOpen={setOpen} /> : <AuthNav setOpen={setOpen} />}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
            <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <NavigationDrawer setOpen={setOpen} />
                  <Divider />
                  {isLoggedIn ? <UserMenu setOpen={setOpen} /> : <AuthNav setOpen={setOpen} />}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

AppHead.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};