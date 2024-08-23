import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice/user.slice";
import { Navigate } from "react-router-dom";
function Logout3() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return <Navigate to="/login" />;
}

export default Logout3;
