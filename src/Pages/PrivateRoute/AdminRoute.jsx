import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

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
            <div className="min-h-screen pt-24 flex justify-center">
                <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
            </div>
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