import React from "react";
import PropTypes from "prop-types";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Outlet } from "react-router-dom";
function Layout({ children }) {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
