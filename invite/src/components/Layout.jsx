import { useState } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { AppHead } from "./AppHead/AppHead";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const Layout = () => {
  const [mode, setMode] = useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppHead mode={mode} toggleColorMode={toggleColorMode} />
        <Box
          id="hero"
          sx={(theme) => ({
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
            backgroundSize: "100% 20%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          })}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: { xs: 10, sm: 12 },
              pb: { xs: 8, sm: 12 },
            }}
          >
            <Box sx={{ my: 4 }}>
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
              <Toaster position="top-right" reverseOrder={false} />
            </Box>
          </Container>

          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: "auto",
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[800],
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="body2" color="text.secondary">
                {"Copyright © "}
                <Link component={RouterLink} color="inherit" to="/">
                  Invites
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
