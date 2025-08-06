import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center">
                <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
            </div>
        );
    }

    // Redirect conditions:
    if (!user?.email) {
        // Not logged in → send to sign-in
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (user?.role !== "admin") {
        // Logged in but not admin → send to home
        return <Navigate to="/dashboard/pending-orders" replace />;
    }

    // User is admin → grant access
    return children;
};

export default AdminRoute;