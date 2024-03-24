import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppHead } from "./AppHead/AppHead";
import Container from "@mui/material/Container";

export const Layout = () => {
  return (
    <>
      <AppHead />
      <Container maxWidth="lg">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    </>
  );
};
