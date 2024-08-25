import ResponsiveAppBar from "./ResponsiveAppBar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}

export default Layout;
