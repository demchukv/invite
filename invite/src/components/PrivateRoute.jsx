import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  //console.log('shouldRedirect: ', shouldRedirect, ', isLoggedIn: ', isLoggedIn, ', isRefreshing :', isRefreshing, ', redirectTo: ', redirectTo);
  
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
