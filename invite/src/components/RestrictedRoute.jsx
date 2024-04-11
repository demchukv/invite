import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useAuth();
  //console.log('isLoggedIn: ', isLoggedIn, ', redirectTo: ', redirectTo);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
  
};

