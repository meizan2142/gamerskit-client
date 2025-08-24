import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loader from "../../Components/loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loader />;
  } else if (user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/signin" replace></Navigate>;
};

export default PrivateRoute;
