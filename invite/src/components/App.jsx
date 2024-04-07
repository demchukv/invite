import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { InvitationLayout } from "./InvitationLayout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { refreshUser } from "../redux/auth/operations";
import { useAuth } from "../hooks";
import Loader from "./Loader/Loader";

const HomePage = lazy(() => import("../pages/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const InvitesPage = lazy(() => import("../pages/InvitesPage"));
const InviteEditPage = lazy(() => import("../pages/InviteEditPage"));
const InviteCreatePage = lazy(() => import("../pages/InviteCreatePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const InvitationPage = lazy(() => import("../pages/InvitationPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>

        {/* Routes that use layout 2 for show guests invitation*/}
        <Route element={<InvitationLayout />}>
          <Route path="/invitation/:link" element={<InvitationPage />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/invites" component={<RegisterPage />} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/invites" component={<LoginPage />} />
            }
          />

          <Route
            path="/invites/:inviteId"
            element={<PrivateRoute redirectTo="/login" component={<InviteEditPage />} />} />
          <Route
            path="/create"
            element={<PrivateRoute redirectTo="/login" component={<InviteCreatePage />} />} />
          <Route
            path="/invites"
            element={
              <PrivateRoute redirectTo="/login" component={<InvitesPage />} />
            }
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>

      </Routes>
    </>
  );
};
