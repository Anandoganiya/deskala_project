import { Navigate,Outlet } from "react-router-dom";

const ProtectedRoute = ({user}) =>{
    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }
    return <Outlet></Outlet>
}
export default ProtectedRoute;