import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isTokenExist } from '../utils/localStorage.js'

// eslint-disable-next-line react/prop-types
export const PrivateRouter = () => {
    const { pathname } = useLocation();

    const token = isTokenExist();

    if(["/login", "/register"].includes(pathname) && token) {
        return <Navigate to='/' />
    }
    if(["/login", "/register"].includes(pathname) && !token) {
        return <Outlet />
    }
    if(!token) {
        return <Navigate to='/login' />
    }
    return (
        <Outlet />
    )
}
