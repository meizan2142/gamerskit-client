import { useContext } from "react"
import { AuthContext } from "../../AuthProvider/AuthProvider"
import { Navigate, useLocation } from "react-router"

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <div className="min-h-screen pt-24 flex justify-center">
            <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-[#FFB300]"></div>
        </div>
    }
    else if (user?.email) {
        return children
    }
    return <Navigate state={location.pathname} to="/signin" replace></Navigate>
}

export default PrivateRoute