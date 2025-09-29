import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { userInfo } = useSelector((state)=> state.userAuth);
    if(!userInfo){
        return <Navigate to="/login" replace/>
    }
  return  children;
}

export default PrivateRoute