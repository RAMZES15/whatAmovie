import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoad = ({ children }) => {
    const {isLogin} = useSelector(state=> state.app)
   
    if (!isLogin) {
        
        return <Navigate to='/'/>;
    }

    return children;
};