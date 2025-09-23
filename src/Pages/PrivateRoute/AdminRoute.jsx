import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Components/loader";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [userRole, setUserRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setUserRole(data?.role);
                    setRoleLoading(false);
                })
                .catch(() => setRoleLoading(false));
        } else {
            setRoleLoading(false);
        }
    }, [user?.email]);

    if (loading || roleLoading) {
        return (
            <Loader/>
        );
    }

    if (!user?.email) {
        // Not logged in → send to sign-in
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (userRole !== "admin") {
        // Logged in but not admin → send to home
        return <Navigate to="/" replace />;
    }

    // User is admin → grant access to the requested route
    return children;
};

export default AdminRoute;