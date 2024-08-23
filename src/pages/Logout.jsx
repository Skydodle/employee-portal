import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice/user.slice";
import { useNavigate } from "react-router-dom";
function Logout3(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
    navigate("/login");
  }, []);
  return <div>Logout3</div>;
}

Logout3.propTypes = {};

export default Logout3;
