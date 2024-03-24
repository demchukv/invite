import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppHead } from "./AppHead/AppHead";

export const Layout = () => {
  return (
    <>
      <AppHead />
      <div className="container">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};
