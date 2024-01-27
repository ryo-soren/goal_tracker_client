import { Navigate, Outlet } from "react-router-dom" 
const AuthRoutes = ({isAuthenticated }) => {
    return(
        isAuthenticated? <Outlet /> : <Navigate to="/sign_in" /> 
    )
}

export default AuthRoutes